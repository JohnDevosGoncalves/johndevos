"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface CursorState {
  x: number;
  y: number;
  hoverTarget: string | null;
}

const CursorContext = createContext<CursorState>({ x: -100, y: -100, hoverTarget: null });

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>({
    x: -100,
    y: -100,
    hoverTarget: null,
  });
  const stateRef = useRef(state);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const newState: CursorState = {
        x: e.clientX,
        y: e.clientY,
        hoverTarget: stateRef.current.hoverTarget,
      };
      stateRef.current = newState;
      setState(newState);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const val = target.getAttribute("data-cursor") || "default";
        stateRef.current = { ...stateRef.current, hoverTarget: val };
        setState({ ...stateRef.current });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      const related = (e.relatedTarget as HTMLElement | null)?.closest("[data-cursor]");
      if (target && !related) {
        stateRef.current = { ...stateRef.current, hoverTarget: null };
        setState({ ...stateRef.current });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <CursorContext.Provider value={state}>{children}</CursorContext.Provider>
  );
}
