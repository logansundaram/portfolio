import { Page } from "../components/Page";

export const AboutPage = () => {
  return (
    <Page title="hi. my name is logan sundaram.">
      <div className="pb-10">
        <div className="text-2xl pb-5">about me:</div>
        <p>
          i’m an electrical engineering student at michigan working toward
          designing gpus and ai accelerators. right now that means working the
          whole stack from the top down: an open-source agent runtime that
          runs open-weight models entirely on local hardware, a cuda
          microbenchmark suite that measures what a blackwell gpu is actually
          doing underneath, and the architecture coursework that gets me from
          measuring the hardware to building it.
        </p>
      </div>
      <div>
        <p>major: electrical engineering</p>
        <p>minor: computer science</p>
        <p>
          interests: computer architecture, vlsi, parallel computing, local
          inference, agentic ai
        </p>
        <p>gpa: 4.0</p>
        <pre>{`coursework:
  in progress (Fall 2026):
    EECS 470  Computer Architecture
  completed:
    EECS 370  Computer Organization
    EECS 281  Data Structures & Algorithms
    EECS 270  Logic Design
    EECS 216  Signals & Systems
    EECS 215  Circuits
    EECS 203  Discrete Math
  planned:
    EECS 312  Digital Integrated Circuits         (W27)
    EECS 482  Operating Systems                   (W27)
    EECS 427  VLSI Design I                       (F27)
    EECS 471  Applied Parallel Programming        (W28)`}</pre>
      </div>
    </Page>
  );
};
