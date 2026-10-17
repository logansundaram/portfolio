export const AboutPage = () => {
  return (
    <div className="text-white p-25">
      <div className="text-amber-500 text-4xl p-25">
        hi. my name is logan sundaram.
      </div>
      <div>
        <div className="text-2xl py-5">about me:</div>
        <p className="">
          <p>major: electrical engineering,</p>
          <p>minor: computer science</p>
          <p>
            interests: computer architecture, vlsi, parallel programming, local
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
  planned:
    EECS 312  Digital Integrated Circuits         (W27)
    EECS 482  Operating Systems                   (W27)
    EECS 427  VLSI Design I                       (F27)
    EECS 471  Applied Parallel Programming        (W28)`}</pre>
        </p>
      </div>
    </div>
  );
};
