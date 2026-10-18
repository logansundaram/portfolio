import type { ReactNode } from "react";
import { Pipeline } from "./Pipeline";

interface PageProps {
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children }: PageProps) => {
  return (
    <div className="text-white p-25">
      <div className="text-amber-500 text-4xl pt-40 pb-20">{title}</div>
      <div className="flex flex-col gap-20 lg:flex-row">
        <div className="max-w-2xl min-w-0 flex-1">{children}</div>
        <div className="w-full max-w-100 shrink-0 lg:-mt-30">
          <Pipeline />
        </div>
      </div>
    </div>
  );
};
