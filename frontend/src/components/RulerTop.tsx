import { useEffect, useState } from "react";

// tick pitch in px: gap-x-10 (40px) plus the 1px border of each tick
const PITCH = 41;

export const RulerTop = () => {
  const [count, setCount] = useState(0);

  // size the ruler to the viewport so it never runs out on wide screens
  useEffect(() => {
    const measure = () => setCount(Math.ceil(window.innerWidth / PITCH) + 2);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="flex fixed top-0 left-0 text-zinc-600 text-[10px] gap-x-10 select-none">
      {Array.from({ length: count }).map((_, index) =>
        index % 2 == 0 ? (
          <div key={index} className="relative">
            <div className="h-4 w-0 border-l"></div>
            <div className={index === 0 ? "absolute left-1" : "absolute left-1/2 -translate-x-1/2"}>
              {index * 5}
            </div>
          </div>
        ) : (
          <div key={index} className="h-2 w-0 border-l"></div>
        ),
      )}
    </div>
  );
};
