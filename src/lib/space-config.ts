// ── Granular Three.js imports (tree-shaking) ──
import { Vector3, Color } from "three";

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
export const SPLINE_POINTS = [
  new Vector3(0, 0, 0),
  new Vector3(30, 15, -500),
  new Vector3(-40, 10, -1000),
  new Vector3(25, -10, -1500),
  new Vector3(-20, 15, -2000),
  new Vector3(15, 5, -2500),
  new Vector3(-45, -20, -3000),
  new Vector3(35, 10, -3500),
  new Vector3(0, 0, -4000),
  new Vector3(10, -5, -4500),
  new Vector3(0, 0, -5000),
];

/* ─── Biome Definitions ─── */
export interface BiomeConfig {
  id: string;
  label: string;
  startZ: number;
  endZ: number;
  color: Color;
  density: number;
  particleSize: number;
  isMeteorShower?: boolean;
}

export const BIOMES: BiomeConfig[] = [
  {
    id: "hero",
    label: "Deep Void",
    startZ: 100,
    endZ: -500,
    color: new Color(0.6, 0.7, 1.0),
    density: 0.2,
    particleSize: 80,
  },
  {
    id: "approche",
    label: "Violet Nebula",
    startZ: -400,
    endZ: -1100,
    color: new Color(0.486, 0.361, 0.988),
    density: 0.8,
    particleSize: 120,
  },
  {
    id: "realisations",
    label: "Teal Nebula",
    startZ: -1000,
    endZ: -1600,
    color: new Color(0.0, 0.831, 0.667),
    density: 0.6,
    particleSize: 100,
  },
  {
    id: "temoignages",
    label: "Coral Dust",
    startZ: -1500,
    endZ: -2100,
    color: new Color(1.0, 0.478, 0.361),
    density: 0.4,
    particleSize: 90,
  },
  {
    id: "apropos",
    label: "Lavender Expanse",
    startZ: -2000,
    endZ: -2600,
    color: new Color(0.655, 0.545, 0.98),
    density: 0.5,
    particleSize: 100,
  },
  {
    id: "techstack",
    label: "Meteor Shower",
    startZ: -2900,
    endZ: -3600,
    color: new Color(1.0, 0.6, 0.2),
    density: 0.9,
    particleSize: 40,
    isMeteorShower: true,
  },
  {
    id: "expertises",
    label: "Purple Expanse",
    startZ: -3500,
    endZ: -4100,
    color: new Color(0.486, 0.361, 0.988),
    density: 0.5,
    particleSize: 100,
  },
  {
    id: "contact",
    label: "Calm Arrival",
    startZ: -4400,
    endZ: -5100,
    color: new Color(0.5, 0.5, 0.7),
    density: 0.15,
    particleSize: 60,
  },
];

/* ─── Star spread dimensions ─── */
export const STAR_SPREAD = {
  x: 800,
  y: 600,
  z: 5800,
};
