/* ─── Star Vertex Shader ─── */
export const starVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aRandom;

  uniform float uTime;
  uniform float uWarpFactor;
  uniform float uPixelRatio;
  uniform vec3 uCameraForward;

  varying float vWarp;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Warp stretch: offset along camera forward when scrolling fast
    float stretch = aRandom * uWarpFactor * 250.0;
    pos += uCameraForward * stretch;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Distance-based size
    float dist = -mvPosition.z;
    float basePtSize = aSize * uPixelRatio * (300.0 / max(dist, 1.0));

    // Warp makes stars bigger (motion blur simulation)
    float warpScale = 1.0 + uWarpFactor * 3.0 * aRandom;
    gl_PointSize = basePtSize * warpScale;

    // Subtle twinkle
    float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + aRandom * 6.28);
    vAlpha = twinkle * (1.0 - smoothstep(2000.0, 5000.0, dist));

    vWarp = uWarpFactor * aRandom;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/* ─── Star Fragment Shader ─── */
export const starFragmentShader = /* glsl */ `
  uniform vec3 uColor;

  varying float vWarp;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;

    // Stretch into streak when warping
    float stretchX = 1.0 + vWarp * 4.0;
    vec2 stretched = vec2(uv.x / stretchX, uv.y);

    float dist = length(stretched);

    // Soft circular falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vAlpha;

    if (alpha < 0.01) discard;

    // Core glow: brighter at center
    float core = exp(-dist * 8.0) * 0.5;
    vec3 col = uColor + core;

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ─── Nebula Vertex Shader ─── */
export const nebulaVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aOpacity;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uCameraZ;

  varying float vOpacity;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = -mvPosition.z;

    // Fade based on distance to camera
    float distFade = 1.0 - smoothstep(200.0, 1500.0, dist);
    float behindFade = smoothstep(-100.0, 100.0, dist); // fade when behind camera

    // Breathing effect
    float breath = 0.7 + 0.3 * sin(uTime * 0.5 + position.x * 0.01);

    vOpacity = aOpacity * distFade * behindFade * breath;

    gl_PointSize = aSize * uPixelRatio * (400.0 / max(dist, 1.0));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/* ─── Nebula Fragment Shader ─── */
export const nebulaFragmentShader = /* glsl */ `
  uniform vec3 uColor;

  varying float vOpacity;

  void main() {
    float dist = length(gl_PointCoord - 0.5);

    // Very soft, cloud-like falloff
    float alpha = exp(-dist * dist * 8.0) * vOpacity;

    if (alpha < 0.002) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;
