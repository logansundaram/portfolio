import { useEffect, useState } from "react";

const pad = (n: number) => String(Math.round(n)).padStart(4, "0");

export const CursorReadout = () => {
  const [coords, setCoords] = useState({ x: "0000", y: "0000" });

  // the state lives here so mouse movement re-renders only this readout,
  // not the whole app and the pipeline diagram.
  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) =>
      setCoords({ x: pad(e.clientX), y: pad(e.clientY) });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    // hidden on small screens: it sat on top of body text there and a touch device never moves it
    <div className="readout hidden md:block text-zinc-500 text-sm fixed bottom-25 right-25 p-3">
      <span className="absolute border-l border-zinc-500 top-0 left-0 size-2" />
      <span className="absolute border-t border-zinc-500 top-0 left-0 size-2" />

      <span className="absolute border-l border-zinc-500 top-full left-0 size-2" />
      <span className="absolute border-b border-zinc-500 top-full left-0 size-2" />

      <span className="absolute border-r border-zinc-500 top-0 left-full size-2" />
      <span className="absolute border-t border-zinc-500 top-0 left-full size-2" />

      <span className="absolute border-r border-zinc-500 bottom-0 left-full size-2" />
      <span className="absolute border-b border-zinc-500 bottom-0 left-full size-2" />

      <div className="text-center leading-tight">
        <div>x:{coords.x}</div>
        <div>y:{coords.y}</div>
      </div>
    </div>
  );
};
