export const RulerTop = () => {
  const COUNT = 40;

  return (
    <div className="flex fixed text-zinc-600 text-[10px] gap-x-10 select-none">
      {Array.from({ length: COUNT }).map((_, index) =>
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
