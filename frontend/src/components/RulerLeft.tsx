export const RulerLeft = () => {
  const COUNT = 50;
  return (
    <div className="flex flex-col fixed text-white gap-y-10">
      {Array.from({ length: COUNT }).map((_, index) =>
        index % 2 == 0 ? (
          <div className="relative">
            <div className="major-tick border-1 w-4"></div>
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              {index * 5}
            </div>
          </div>
        ) : (
          <div className="minor-tick border-1 w-2" />
        ),
      )}
    </div>
  );
};
