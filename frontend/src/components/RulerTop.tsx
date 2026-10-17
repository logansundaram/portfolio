export const RulerTop = () => {
  const COUNT = 40;

  return (
    <div className="flex fixed text-white gap-x-10">
      {Array.from({ length: COUNT }).map((_, index) =>
        index % 2 == 0 ? (
          <div className="relative">
            <div className="h-4 w-0 border-1"></div>
            <div className="absolute left-1/2 -translate-x-1/2">
              {index * 5}
            </div>
          </div>
        ) : (
          <div className="h-2 w-0 border-1"></div>
        ),
      )}
    </div>
  );
};
