interface CursorReadoutProps {
  positionX: string;
  positionY: string;
}

export const CursorReadout = ({ positionX, positionY }: CursorReadoutProps) => {
  return (
    <div className="text-zinc-500 text-[11px] fixed bottom-25 right-25 p-3">
      <span className="absolute border-l border-zinc-500 top-0 left-0 size-2" />
      <span className="absolute border-t border-zinc-500 top-0 left-0 size-2" />

      <span className="absolute border-l border-zinc-500 top-full left-0 size-2" />
      <span className="absolute border-b border-zinc-500 top-full left-0 size-2" />

      <span className="absolute border-r border-zinc-500 top-0 left-full size-2" />
      <span className="absolute border-t border-zinc-500 top-0 left-full size-2" />

      <span className="absolute border-r border-zinc-500 bottom-0 left-full size-2" />
      <span className="absolute border-b border-zinc-500 bottom-0 left-full size-2" />

      <div className="flex-none shrink-0 grow-0 w-10 h-8">
        <div>x:{positionX}</div>
        <div>y:{positionY}</div>
      </div>
    </div>
  );
};
