// deprecated
import { Tick } from "./Tick";

export const GridBackground = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-4 h-screen w-screen fixed">
      <div>
        <div>
          <Tick />
        </div>
        <div>
          <Tick />
        </div>
        <div>
          <Tick />
        </div>
        <div>
          <Tick />
        </div>
      </div>
      <div>
        <Tick />
      </div>
      <div>
        <Tick />
      </div>
      <div>
        <Tick />
      </div>
      <div>
        <Tick />
      </div>
      <div>
        <Tick />
      </div>
    </div>
  );
};
