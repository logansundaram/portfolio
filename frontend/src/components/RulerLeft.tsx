export const RulerLeft = () => {
  const COUNT = 50;
  return (
    <div className="flex flex-col fixed text-zinc-600 text-[10px] gap-y-10 select-none">
      {Array.from({ length: COUNT }).map((_, index) =>
        index % 2 == 0 ? (
          <div className="relative">
            <div className="major-tick border-t w-4"></div>
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              {index * 5}
            </div>
          </div>
        ) : (
          <div className="minor-tick border-t w-2" />
        ),
      )}
    </div>
  );
};
