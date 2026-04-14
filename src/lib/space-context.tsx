"use client";

import { createContext, useContext, useRef, type ReactNode, type MutableRefObject } from "react";

export interface SpaceState {
  cameraProgress: number;
  cameraZ: number;
  scrollVelocity: number;
  warpFactor: number;
}

const defaultState: SpaceState = {
  cameraProgress: 0,
  cameraZ: 0,
  scrollVelocity: 0,
  warpFactor: 0,
};

// Using a ref for performance — context value never changes (it's the ref),
// so consumers don't re-render on every frame.
const SpaceContext = createContext<MutableRefObject<SpaceState>>({
  current: defaultState,
});

export function useSpace(): MutableRefObject<SpaceState> {
  return useContext(SpaceContext);
}

export function SpaceProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<SpaceState>(defaultState);

  return (
    <SpaceContext.Provider value={stateRef}>
      {children}
    </SpaceContext.Provider>
  );
}
