import { Page } from "../components/Page";

type Course = [code: string, name: string, term?: string];

const coursework: { group: string; courses: Course[] }[] = [
  {
    group: "in progress (fall 2026)",
    courses: [["EECS 470", "Computer Architecture"]],
  },
  {
    group: "completed",
    courses: [
      ["EECS 370", "Computer Organization"],
      ["EECS 281", "Data Structures & Algorithms"],
      ["EECS 270", "Logic Design"],
      ["EECS 216", "Signals & Systems"],
      ["EECS 215", "Circuits"],
      ["EECS 203", "Discrete Math"],
    ],
  },
  {
    group: "planned",
    courses: [
      ["EECS 312", "Digital Integrated Circuits", "W27"],
      ["EECS 482", "Operating Systems", "W27"],
      ["EECS 427", "VLSI Design I", "F27"],
      ["EECS 471", "Applied Parallel Programming", "F27"],
    ],
  },
];

export const AboutPage = () => {
  return (
    <Page title="hi. my name is logan sundaram.">
      <div className="pb-10">
        <h2 className="text-2xl pb-5">about me:</h2>
        <p>
          i’m an electrical engineering student at michigan working toward
          designing gpus and ai accelerators. right now that means working the
          whole stack from the top down: an open-source agent runtime that runs
          open-weight models entirely on local hardware, a cuda microbenchmark
          suite that measures what a blackwell gpu is actually doing underneath,
          and the architecture coursework that gets me from measuring the
          hardware to building it.
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
        <p>coursework:</p>
        {/* a list rather than a padded pre block so long course names wrap on phones instead of clipping */}
        {coursework.map(({ group, courses }) => (
          <div key={group} className="pl-4">
            <p>{group}:</p>
            <ul className="pl-4">
              {courses.map(([code, name, term]) => (
                <li key={code} className="flex gap-x-3">
                  <span className="shrink-0">{code}</span>
                  <span>
                    {name}
                    {term && <span className="text-zinc-500"> ({term})</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Page>
  );
};
