import * as THREE from "three";

/* ─── Constants ─── */
export const STAR_COUNT = 5000;
export const STAR_COUNT_MOBILE = 1500;
export const NEBULA_PARTICLES_PER_BIOME = 350;
export const METEOR_COUNT = 200;
export const CURSOR_POOL_SIZE = 50;
export const CAMERA_FOV = 60;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 12000;
export const TOTAL_PATH_LENGTH = 5500;
export const WARP_SENSITIVITY = 8.0;
export const WARP_LERP = 0.08;
export const CAMERA_LERP = 0.1;
export const LOOK_AHEAD = 0.005;

/* ─── Spline Control Points ─── */
// The camera flies through these points as the user scrolls.
// Mostly forward (Z-axis) with gentle lateral curves at section transitions.
export const SPLINE_POINTS = [
  new THREE.Vector3(0, 0, 0),           // Hero start
  new THREE.Vector3(30, 15, -500),       // Hero end → Approche
  new THREE.Vector3(-40, 10, -1000),     // Approche end → Réalisations
  new THREE.Vector3(25, -10, -1500),     // Réalisations end → Témoignages
  new THREE.Vector3(-20, 15, -2000),     // Témoignages end → À Propos
  new THREE.Vector3(15, 5, -2500),       // À Propos end → Engagement
  new THREE.Vector3(-45, -20, -3000),    // Engagement end → TechStack
  new THREE.Vector3(35, 10, -3500),      // TechStack end → Expertises
  new THREE.Vector3(0, 0, -4000),        // Expertises end → FAQ
  new THREE.Vector3(10, -5, -4500),      // FAQ end → Contact
  new THREE.Vector3(0, 0, -5000),        // Contact end → Footer
];

/* ─── Biome Definitions ─── */
export interface BiomeConfig {
  id: string;
  label: string;
  startZ: number;
  endZ: number;
  color: THREE.Color;
  density: number; // 0-1, relative particle density
  particleSize: number; // base size for nebula particles
  isMeteorShower?: boolean;
}

export const BIOMES: BiomeConfig[] = [
  {
    id: "hero",
    label: "Deep Void",
    startZ: 100,
    endZ: -500,
    color: new THREE.Color(0.6, 0.7, 1.0), // blue-white
    density: 0.2,
    particleSize: 80,
  },
  {
    id: "approche",
    label: "Violet Nebula",
    startZ: -400,
    endZ: -1100,
    color: new THREE.Color(0.486, 0.361, 0.988), // #7c5cfc
    density: 0.8,
    particleSize: 120,
  },
  {
    id: "realisations",
    label: "Teal Nebula",
    startZ: -1000,
    endZ: -1600,
    color: new THREE.Color(0.0, 0.831, 0.667), // #00d4aa
    density: 0.6,
    particleSize: 100,
  },
  {
    id: "temoignages",
    label: "Coral Dust",
    startZ: -1500,
    endZ: -2100,
    color: new THREE.Color(1.0, 0.478, 0.361), // #ff7a5c
    density: 0.4,
    particleSize: 90,
  },
  {
    id: "apropos",
    label: "Lavender Expanse",
    startZ: -2000,
    endZ: -2600,
    color: new THREE.Color(0.655, 0.545, 0.98), // #a78bfa
    density: 0.5,
    particleSize: 100,
  },
  {
    id: "techstack",
    label: "Meteor Shower",
    startZ: -2900,
    endZ: -3600,
    color: new THREE.Color(1.0, 0.6, 0.2), // orange-white
    density: 0.9,
    particleSize: 40,
    isMeteorShower: true,
  },
  {
    id: "expertises",
    label: "Purple Expanse",
    startZ: -3500,
    endZ: -4100,
    color: new THREE.Color(0.486, 0.361, 0.988),
    density: 0.5,
    particleSize: 100,
  },
  {
    id: "contact",
    label: "Calm Arrival",
    startZ: -4400,
    endZ: -5100,
    color: new THREE.Color(0.5, 0.5, 0.7),
    density: 0.15,
    particleSize: 60,
  },
];

/* ─── Star spread dimensions ─── */
export const STAR_SPREAD = {
  x: 800,  // ±400 laterally
  y: 600,  // ±300 vertically
  z: 5800, // full path + buffer
};
