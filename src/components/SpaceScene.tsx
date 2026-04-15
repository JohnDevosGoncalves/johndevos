"use client";

import { useEffect, useRef } from "react";
// ── TREE-SHAKING: Granular Three.js imports (~80KB instead of ~600KB) ──
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  ShaderMaterial,
  AdditiveBlending,
  Vector3,
  Color,
  CatmullRomCurve3,
  Mesh,
  Material,
} from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpace } from "@/lib/space-context";
import {
  SPLINE_POINTS,
  STAR_COUNT,
  STAR_COUNT_MOBILE,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_FAR,
  STAR_SPREAD,
  BIOMES,
  NEBULA_PARTICLES_PER_BIOME,
  METEOR_COUNT,
  WARP_SENSITIVITY,
  WARP_LERP,
  CAMERA_LERP,
  LOOK_AHEAD,
} from "@/lib/space-config";
import {
  starVertexShader,
  starFragmentShader,
  nebulaVertexShader,
  nebulaFragmentShader,
} from "@/lib/space-shaders";

gsap.registerPlugin(ScrollTrigger);

/* ─── Battery / Low-Power detection ─── */
interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
}

async function detectLowPower(): Promise<boolean> {
  // 1. Check prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  // 2. Battery API: low battery + not charging → low power
  try {
    if ("getBattery" in navigator) {
      const battery = await (navigator as unknown as { getBattery(): Promise<BatteryManager> }).getBattery();
      if (!battery.charging && battery.level < 0.2) return true;
    }
  } catch {
    // Battery API not available — continue
  }

  // 3. Device memory API (Chrome): < 4GB = constrained
  if ("deviceMemory" in navigator) {
    const mem = (navigator as unknown as { deviceMemory: number }).deviceMemory;
    if (mem < 4) return true;
  }

  // 4. Hardware concurrency: < 4 cores = constrained
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true;

  return false;
}

export default function SpaceScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spaceState = useSpace();

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // WebGL check
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!gl || prefersReducedMotion) return;

    const container = containerRef.current;

    // ── Adaptive Quality (runs async, degrades later if needed) ──
    let lowPowerMode = false;
    let targetFps = 60;

    detectLowPower().then((isLow) => {
      if (isLow) {
        lowPowerMode = true;
        targetFps = 30;
        gsap.ticker.fps(30);
        // Reduce star count live: hide half by moving off-screen
        if (starPositions) {
          for (let i = Math.floor(starCount / 2); i < starCount; i++) {
            starPositions[i * 3 + 2] = 99999; // move far away
          }
          const posAttr = starGeometry.getAttribute("position");
          if (posAttr) (posAttr as { needsUpdate: boolean }).needsUpdate = true;
        }
      }
    });

    // DPR capping
    const dpr = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : Math.min(window.devicePixelRatio || 1, 2);
    const starCount = isMobile ? STAR_COUNT_MOBILE : STAR_COUNT;

    // ── Renderer ──
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("[SpaceScene] WebGL init failed:", e);
      return;
    }
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Scene + Camera ──
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );

    // ── Spline Path ──
    const curve = new CatmullRomCurve3(SPLINE_POINTS, false, "catmullrom", 0.5);

    // ── Star Field ──
    const starGeometry = new BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starRandoms = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * STAR_SPREAD.x;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * STAR_SPREAD.y;
      starPositions[i * 3 + 2] = Math.random() * -STAR_SPREAD.z + 200;
      starSizes[i] = Math.random() * 3.0 + 0.5;
      starRandoms[i] = Math.random();
    }

    starGeometry.setAttribute("position", new Float32BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("aSize", new Float32BufferAttribute(starSizes, 1));
    starGeometry.setAttribute("aRandom", new Float32BufferAttribute(starRandoms, 1));

    const starUniforms = {
      uTime: { value: 0 },
      uWarpFactor: { value: 0 },
      uPixelRatio: { value: dpr },
      uCameraForward: { value: new Vector3(0, 0, -1) },
      uColor: { value: new Color(0.85, 0.9, 1.0) },
    };

    const starMaterial = isMobile
      ? new PointsMaterial({
          color: 0xdde0ff,
          size: 2.0,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.8,
          depthWrite: false,
        })
      : new ShaderMaterial({
          vertexShader: starVertexShader,
          fragmentShader: starFragmentShader,
          uniforms: starUniforms,
          transparent: true,
          depthWrite: false,
          blending: AdditiveBlending,
        });

    const stars = new Points(starGeometry, starMaterial);
    scene.add(stars);

    // ── Nebulae (LAZY LOADED by camera proximity, skip in low-power) ──
    const nebulaGroups: Points[] = [];
    const loadedBiomes = new Set<string>();
    const BIOME_LOAD_DISTANCE = 800;

    function loadBiome(biome: typeof BIOMES[number]) {
      if (loadedBiomes.has(biome.id) || biome.isMeteorShower || lowPowerMode) return;
      loadedBiomes.add(biome.id);

      const count = Math.floor(NEBULA_PARTICLES_PER_BIOME * biome.density);
      const geo = new BufferGeometry();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const opacities = new Float32Array(count);
      const zRange = Math.abs(biome.endZ - biome.startZ);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 500;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 350;
        positions[i * 3 + 2] = biome.startZ - Math.random() * zRange;
        sizes[i] = biome.particleSize * (0.5 + Math.random() * 1.0);
        opacities[i] = 0.01 + Math.random() * 0.04;
      }

      geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
      geo.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
      geo.setAttribute("aOpacity", new Float32BufferAttribute(opacities, 1));

      const mat = new ShaderMaterial({
        vertexShader: nebulaVertexShader,
        fragmentShader: nebulaFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
          uCameraZ: { value: 0 },
          uColor: { value: biome.color.clone() },
        },
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      });

      const points = new Points(geo, mat);
      scene.add(points);
      nebulaGroups.push(points);
    }

    // ── Meteor Shower (LAZY LOADED, skip in low-power) ──
    let meteorPositions: Float32Array | null = null;
    let meteorPoints: Points | null = null;
    const techBiome = BIOMES.find((b) => b.isMeteorShower);
    let meteorLoaded = false;

    function loadMeteors() {
      if (meteorLoaded || isMobile || !techBiome || lowPowerMode) return;
      meteorLoaded = true;

      const geo = new BufferGeometry();
      meteorPositions = new Float32Array(METEOR_COUNT * 3);
      const mSizes = new Float32Array(METEOR_COUNT);
      const mRandoms = new Float32Array(METEOR_COUNT);
      const zRange = Math.abs(techBiome.endZ - techBiome.startZ);

      for (let i = 0; i < METEOR_COUNT; i++) {
        meteorPositions[i * 3] = (Math.random() - 0.5) * 400;
        meteorPositions[i * 3 + 1] = (Math.random() - 0.5) * 300;
        meteorPositions[i * 3 + 2] = techBiome.startZ - Math.random() * zRange;
        mSizes[i] = Math.random() * 2.0 + 0.5;
        mRandoms[i] = Math.random();
      }

      geo.setAttribute("position", new Float32BufferAttribute(meteorPositions, 3));
      geo.setAttribute("aSize", new Float32BufferAttribute(mSizes, 1));
      geo.setAttribute("aRandom", new Float32BufferAttribute(mRandoms, 1));

      const mat = new ShaderMaterial({
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uWarpFactor: { value: 0.3 },
          uPixelRatio: { value: dpr },
          uCameraForward: { value: new Vector3(0, 0, -1) },
          uColor: { value: techBiome.color.clone() },
        },
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      });

      meteorPoints = new Points(geo, mat);
      scene.add(meteorPoints);
    }

    // ── Animation State ──
    let lastProgress = 0;
    let lastTime = performance.now();
    const targetCamPos = new Vector3();
    const targetLookAt = new Vector3();
    const currentCamPos = new Vector3();
    let currentLookAtLerp = new Vector3();
    let initialized = false;
    let liftoffWarp = 0;

    // Listen for liftoff event from Loader
    const onLiftoff = () => {
      gsap.fromTo(
        { value: 0 },
        { value: 1 },
        {
          value: 1,
          duration: 0.3,
          ease: "power4.in",
          onUpdate: function () { liftoffWarp = this.targets()[0].value; },
          onComplete: () => {
            gsap.to({ value: 1 }, {
              value: 0,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: function () { liftoffWarp = this.targets()[0].value; },
            });
          },
        }
      );
    };
    window.addEventListener("space-liftoff", onLiftoff);

    // ── Reusable Vector3 (avoid GC pressure) ──
    const _forward = new Vector3();

    // ── GSAP Ticker ──
    const onTick = (time: number) => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const elapsed = time;

      // Scroll progress
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;

      // Warp factor
      const velocity = Math.abs(progress - lastProgress) / Math.max(dt, 0.001);
      const scrollWarp = Math.min(1.0, velocity * WARP_SENSITIVITY);
      const warpTarget = Math.min(1.0, Math.max(scrollWarp, liftoffWarp));
      const currentWarp = starUniforms.uWarpFactor.value;
      starUniforms.uWarpFactor.value += (warpTarget - currentWarp) * WARP_LERP;
      lastProgress = progress;

      // Camera on spline
      curve.getPointAt(progress, targetCamPos);
      curve.getPointAt(Math.min(1, progress + LOOK_AHEAD), targetLookAt);

      if (!initialized) {
        currentCamPos.copy(targetCamPos);
        currentLookAtLerp = targetLookAt.clone();
        initialized = true;
      } else {
        currentCamPos.lerp(targetCamPos, CAMERA_LERP);
        currentLookAtLerp.lerp(targetLookAt, CAMERA_LERP);
      }

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAtLerp);

      // Camera forward (reuse vector)
      camera.getWorldDirection(_forward);
      starUniforms.uCameraForward.value.copy(_forward);
      starUniforms.uTime.value = elapsed;

      // Lazy-load biomes + meteors
      if (!isMobile && !lowPowerMode) {
        const camZ = currentCamPos.z;
        for (const biome of BIOMES) {
          if (!loadedBiomes.has(biome.id) && camZ < biome.startZ + BIOME_LOAD_DISTANCE) {
            loadBiome(biome);
          }
        }
        if (!meteorLoaded && techBiome && camZ < techBiome.startZ + BIOME_LOAD_DISTANCE) {
          loadMeteors();
        }
      }

      // Update nebula uniforms
      for (let i = 0; i < nebulaGroups.length; i++) {
        const mat = nebulaGroups[i].material as ShaderMaterial;
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uCameraZ.value = currentCamPos.z;
      }

      // Meteor animation
      if (meteorPositions && meteorPoints && techBiome) {
        const posAttr = meteorPoints.geometry.getAttribute("position");
        const zMin = techBiome.startZ;
        const zMax = techBiome.endZ;

        for (let i = 0; i < METEOR_COUNT; i++) {
          meteorPositions[i * 3 + 2] += 2.0;
          if (meteorPositions[i * 3 + 2] > zMin + 100) {
            meteorPositions[i * 3 + 2] = zMax;
            meteorPositions[i * 3] = (Math.random() - 0.5) * 400;
            meteorPositions[i * 3 + 1] = (Math.random() - 0.5) * 300;
          }
        }
        (posAttr as { needsUpdate: boolean }).needsUpdate = true;

        const mMat = meteorPoints.material as ShaderMaterial;
        mMat.uniforms.uTime.value = elapsed;
        mMat.uniforms.uCameraForward.value.copy(_forward);
      }

      // Shared state
      spaceState.current = {
        cameraProgress: progress,
        cameraZ: currentCamPos.z,
        scrollVelocity: velocity,
        warpFactor: starUniforms.uWarpFactor.value,
      };

      renderer.render(scene, camera);
    };

    // FPS cap
    gsap.ticker.fps(targetFps);
    gsap.ticker.add(onTick);

    // Page Visibility API
    let isVisible = true;
    const onVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        gsap.ticker.remove(onTick);
      } else {
        isVisible = true;
        lastTime = performance.now();
        gsap.ticker.add(onTick);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Resize
    const onResize = () => {
      if (!isVisible) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("space-liftoff", onLiftoff);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      scene.traverse((obj) => {
        if (obj instanceof Points || obj instanceof Mesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m: Material) => m.dispose());
            } else {
              (obj.material as Material).dispose();
            }
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [spaceState]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      role="presentation"
      aria-hidden="true"
      aria-label="Animated space background with stars and nebulae"
    />
  );
}
