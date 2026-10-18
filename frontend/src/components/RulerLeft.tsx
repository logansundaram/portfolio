import { useEffect, useRef, useState } from "react";

// tick pitch in px: gap-y-10 (40px) plus the 1px border of each tick
const PITCH = 41;

export const RulerLeft = () => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  // size the ruler to the full document so it never runs out on long pages.
  // the body resizes whenever a route renders different content.
  useEffect(() => {
    const measure = () =>
      setCount(Math.ceil(document.documentElement.scrollHeight / PITCH) + 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rulerRef.current) {
        rulerRef.current.style.transform = `translateY(${-window.scrollY}px)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={rulerRef} className="flex flex-col fixed top-0 left-0 text-zinc-600 text-[10px] gap-y-10 select-none">
      {Array.from({ length: count }).map((_, index) =>
        index % 2 == 0 ? (
          <div key={index} className="relative">
            <div className="major-tick border-t w-4"></div>
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              {index * 5}
            </div>
          </div>
        ) : (
          <div key={index} className="minor-tick border-t w-2" />
        ),
      )}
    </div>
  );
};
