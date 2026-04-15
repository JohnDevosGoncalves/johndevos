"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
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

export default function SpaceScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spaceState = useSpace();

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    // ── Detect capabilities ──
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // WebGL check
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!gl) {
      // No WebGL → skip 3D entirely, background shows through
      return;
    }

    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const starCount = isMobile ? STAR_COUNT_MOBILE : STAR_COUNT;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Scene + Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );

    // ── Spline Path ──
    const curve = new THREE.CatmullRomCurve3(SPLINE_POINTS, false, "catmullrom", 0.5);

    // ── Star Field ──
    const starGeometry = new THREE.BufferGeometry();
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

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("aSize", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute("aRandom", new THREE.BufferAttribute(starRandoms, 1));

    const starUniforms = {
      uTime: { value: 0 },
      uWarpFactor: { value: 0 },
      uPixelRatio: { value: dpr },
      uCameraForward: { value: new THREE.Vector3(0, 0, -1) },
      uColor: { value: new THREE.Color(0.85, 0.9, 1.0) },
    };

    const starMaterial = isMobile
      ? new THREE.PointsMaterial({
          color: 0xdde0ff,
          size: 2.0,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.8,
          depthWrite: false,
        })
      : new THREE.ShaderMaterial({
          vertexShader: starVertexShader,
          fragmentShader: starFragmentShader,
          uniforms: starUniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // ── Nebulae (desktop only) ──
    const nebulaGroups: THREE.Points[] = [];

    if (!isMobile) {
      BIOMES.forEach((biome) => {
        if (biome.isMeteorShower) return; // handle separately

        const count = Math.floor(NEBULA_PARTICLES_PER_BIOME * biome.density);
        const geo = new THREE.BufferGeometry();
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

        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));

        const mat = new THREE.ShaderMaterial({
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
          blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geo, mat);
        scene.add(points);
        nebulaGroups.push(points);
      });
    }

    // ── Meteor Shower (TechStack zone, desktop only) ──
    let meteorPositions: Float32Array | null = null;
    let meteorPoints: THREE.Points | null = null;
    const techBiome = BIOMES.find((b) => b.isMeteorShower);

    if (!isMobile && techBiome) {
      const geo = new THREE.BufferGeometry();
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

      geo.setAttribute("position", new THREE.BufferAttribute(meteorPositions, 3));
      geo.setAttribute("aSize", new THREE.BufferAttribute(mSizes, 1));
      geo.setAttribute("aRandom", new THREE.BufferAttribute(mRandoms, 1));

      const mat = new THREE.ShaderMaterial({
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uWarpFactor: { value: 0.3 }, // always slightly warped
          uPixelRatio: { value: dpr },
          uCameraForward: { value: new THREE.Vector3(0, 0, -1) },
          uColor: { value: techBiome.color.clone() },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      meteorPoints = new THREE.Points(geo, mat);
      scene.add(meteorPoints);
    }

    // ── Animation State ──
    let lastProgress = 0;
    let lastTime = performance.now();
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();
    const currentCamPos = new THREE.Vector3();
    let currentLookAtLerp = new THREE.Vector3();
    let initialized = false;
    let liftoffWarp = 0; // Extra warp from liftoff event (0→1→0)

    // Listen for liftoff event from Loader
    const onLiftoff = () => {
      // Spike warp to max, then ease down over 2 seconds
      gsap.fromTo(
        { value: 0 },
        { value: 1 },
        {
          value: 1,
          duration: 0.3,
          ease: "power4.in",
          onUpdate: function () {
            liftoffWarp = this.targets()[0].value;
          },
          onComplete: () => {
            gsap.to({ value: 1 }, {
              value: 0,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: function () {
                liftoffWarp = this.targets()[0].value;
              },
            });
          },
        }
      );
    };
    window.addEventListener("space-liftoff", onLiftoff);

    // ── GSAP Ticker (synced with Lenis) ──
    const onTick = (time: number) => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const elapsed = time; // GSAP time in seconds

      // Read scroll progress
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;

      // Compute scroll velocity → warp factor (+ liftoff burst)
      const velocity = Math.abs(progress - lastProgress) / Math.max(dt, 0.001);
      const scrollWarp = Math.min(1.0, velocity * WARP_SENSITIVITY);
      const warpTarget = Math.min(1.0, Math.max(scrollWarp, liftoffWarp));
      const currentWarp = starUniforms.uWarpFactor.value;
      starUniforms.uWarpFactor.value += (warpTarget - currentWarp) * WARP_LERP;
      lastProgress = progress;

      // Camera position on spline
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

      // Camera forward vector for warp shader
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      starUniforms.uCameraForward.value.copy(forward);

      // Update uniforms
      starUniforms.uTime.value = elapsed;

      // Update nebula uniforms
      nebulaGroups.forEach((ng) => {
        const mat = ng.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uCameraZ.value = currentCamPos.z;
      });

      // Meteor animation: move toward camera
      if (meteorPositions && meteorPoints && techBiome) {
        const posAttr = meteorPoints.geometry.getAttribute("position") as THREE.BufferAttribute;
        const zMin = techBiome.startZ;
        const zMax = techBiome.endZ;

        for (let i = 0; i < METEOR_COUNT; i++) {
          meteorPositions[i * 3 + 2] += 2.0; // move toward camera
          // Wrap around
          if (meteorPositions[i * 3 + 2] > zMin + 100) {
            meteorPositions[i * 3 + 2] = zMax;
            meteorPositions[i * 3] = (Math.random() - 0.5) * 400;
            meteorPositions[i * 3 + 1] = (Math.random() - 0.5) * 300;
          }
        }
        posAttr.needsUpdate = true;

        const mMat = meteorPoints.material as THREE.ShaderMaterial;
        mMat.uniforms.uTime.value = elapsed;
        mMat.uniforms.uCameraForward.value.copy(forward);
      }

      // Update shared space state (for other components)
      spaceState.current = {
        cameraProgress: progress,
        cameraZ: currentCamPos.z,
        scrollVelocity: velocity,
        warpFactor: starUniforms.uWarpFactor.value,
      };

      renderer.render(scene, camera);
    };

    gsap.ticker.add(onTick);

    // ── Resize ──
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ──
    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("space-liftoff", onLiftoff);

      // Dispose everything
      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (obj.material instanceof THREE.Material) {
            obj.material.dispose();
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
      aria-hidden="true"
    />
  );
}
