import type { ReactNode } from "react";
import { Pipeline } from "./Pipeline";

interface PageProps {
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children }: PageProps) => {
  return (
    <main className="text-zinc-300 p-12 md:p-25">
      <h1 className="text-amber-500 text-3xl md:text-4xl pb-12 md:pb-20">
        {title}
      </h1>
      <div className="flex flex-col gap-12 lg:gap-20 lg:flex-row">
        <div className="max-w-2xl min-w-0 flex-1">{children}</div>
        <div className="w-full max-w-100 shrink-0 lg:-mt-30">
          <Pipeline />
        </div>
      </div>
    </main>
  );
};
