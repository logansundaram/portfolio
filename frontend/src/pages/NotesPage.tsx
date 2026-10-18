import { Page } from "../components/Page";

export const NotesPage = () => {
  return (
    <Page title="things i’m figuring out.">
      <div className="pb-10">
        <div className="text-2xl pb-5">notes:</div>
        <p>
          short writeups on things i’ve measured, read, or gotten wrong. mostly
          gpus, computer architecture, and running models locally.
        </p>
      </div>
      <div className="pb-10">
        <div className="text-2xl pb-5">recent:</div>
        <pre className="font-bold whitespace-pre-wrap">{"2026-10-18  start of the portfolio"}</pre>
        <p className="pb-4">
          created my portfolio using vite + react + tailwind + react-router
        </p>
        <pre className="font-bold whitespace-pre-wrap">{"2026-10-19  RV32I processor"}</pre>
        <p className="pb-4">
          in order to increase my fluency in system verilog and RTL design, i've
          started a project to design an RV32I processor. will be benchmarking
          using riscv-tests.
        </p>
      </div>
    </Page>
  );
};
