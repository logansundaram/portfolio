interface CursorReadoutProps {
  positionX: string;
  positionY: string;
}

export const CursorReadout = ({ positionX, positionY }: CursorReadoutProps) => {
  return (
    <div className="text-white fixed bottom-25 right-25 p-4">
      <span className="absolute border-l-2 border-slate-200 top-0 left-0 size-3" />
      <span className="absolute border-t-2 border-slate-200 top-0 left-0 size-3" />

      <span className="absolute border-l-2 border-slate-200 top-full left-0 size-3" />
      <span className="absolute border-b-2 border-slate-200 top-full left-0 size-3" />

      <span className="absolute border-r-2 border-slate-200 top-0 left-full size-3" />
      <span className="absolute border-t-2 border-slate-200 top-0 left-full size-3" />

      <span className="absolute border-r-2 border-slate-200 bottom-0 left-full size-3" />
      <span className="absolute border-b-2 border-slate-200 bottom-0 left-full size-3" />

      <div className="flex-none shrink-0 grow-0 w-12 h-10">
        <div>x:{positionX}</div>
        <div>y:{positionY}</div>
      </div>
    </div>
  );
};
