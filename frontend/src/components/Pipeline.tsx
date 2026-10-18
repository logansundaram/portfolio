import { useState } from "react";

// ---------------------------------------------------------------------------
// the lc2k 5-stage pipeline datapath, rotated so data flows top to bottom.
// pipeline registers are the horizontal bars; stage logic sits between them.
// static drawing; hovering a stage or a feedback path traces it.
// ---------------------------------------------------------------------------

const W = 400;
const H = 622;
const BAR_H = 34;

// a field keeps its column as it moves down the bars
const X = { pc: 72, valA: 130, valB: 190, off: 248, dest: 296, op: 350, eq: 118, alu: 178, instr: 242, wb: 213 };
// bar top edges
const Y = { ifid: 110, idex: 258, exmem: 420, memwb: 530 };
type RowKey = keyof typeof Y;
const B = (k: RowKey) => Y[k] + BAR_H;

type Stage = "if" | "id" | "ex" | "mem" | "wb";
type Focus = Stage | "target" | "fwdExmem" | "fwdWb" | null;

const ROWS: { key: RowKey; label: string; cells: { name: string; x0: number; x1: number }[] }[] = [
  {
    key: "ifid",
    label: "if/id",
    cells: [
      { name: "pc+1", x0: 44, x1: 100 },
      { name: "instruction", x0: 100, x1: 384 },
    ],
  },
  {
    key: "idex",
    label: "id/ex",
    cells: [
      { name: "pc+1", x0: 44, x1: 100 },
      { name: "valA", x0: 100, x1: 160 },
      { name: "valB", x0: 160, x1: 220 },
      { name: "offset", x0: 220, x1: 276 },
      { name: "dest", x0: 276, x1: 316 },
      { name: "op", x0: 316, x1: 384 },
    ],
  },
  {
    key: "exmem",
    label: "ex/mem",
    cells: [
      { name: "target", x0: 44, x1: 100 },
      { name: "eq?", x0: 100, x1: 136 },
      { name: "aluResult", x0: 136, x1: 220 },
      { name: "valB", x0: 220, x1: 276 },
      { name: "dest", x0: 276, x1: 316 },
      { name: "op", x0: 316, x1: 384 },
    ],
  },
  {
    key: "memwb",
    label: "mem/wb",
    cells: [
      { name: "aluResult", x0: 136, x1: 220 },
      { name: "mdata", x0: 220, x1: 276 },
      { name: "dest", x0: 276, x1: 316 },
      { name: "op", x0: 316, x1: 384 },
    ],
  },
];

// --- wires, grouped by the stage whose logic they belong to ---------------

const WIRES: Record<Stage, string[]> = {
  if: [
    `M 64 26 V 30`, // pc mux -> pc
    `M 64 48 V 56 H 190`, // pc -> inst mem addr
    `M 64 56 V 72`, // pc -> +1
    `M 82 68 V 72`, // const 1 -> +1
    `M 72 96 V ${Y.ifid}`, // +1 -> if/id pc+1
    `M ${X.instr} 92 V ${Y.ifid}`, // inst mem -> if/id instruction
  ],
  id: [
    `M ${X.pc} ${B("ifid")} V ${Y.idex}`, // pc+1 straight through
    `M ${X.instr} ${B("ifid")} V 156 M ${X.valA} 156 H ${X.op}`, // instruction bus
    `M ${X.valA} 156 V 172`, // regA
    `M ${X.valB} 156 V 172`, // regB
    `M ${X.off} 156 V ${Y.idex}`, // offset
    `M 290 156 V 226`, // bits 0-2 -> dest mux
    `M 302 156 V 226`, // bits 16-18 -> dest mux
    `M ${X.dest} 244 V ${Y.idex}`, // dest mux -> id/ex dest
    `M ${X.op} 156 V ${Y.idex}`, // op
    `M ${X.valA} 248 V ${Y.idex}`, // reg file -> valA
    `M ${X.valB} 248 V ${Y.idex}`, // reg file -> valB
  ],
  ex: [
    `M ${X.pc} ${B("idex")} V 346 H 62 V 352`, // pc+1 -> target adder
    `M ${X.off} ${B("idex")} V 300 H 82 V 352`, // offset -> target adder
    `M 220 300 V 346`, // offset -> alu operand mux
    `M 72 376 V ${Y.exmem}`, // target adder -> ex/mem target
    `M ${X.valA} ${B("idex")} V 314`, // valA -> forward mux a
    `M ${X.valB} ${B("idex")} V 314`, // valB -> forward mux b
    `M ${X.valA} 332 V 370`, // forward mux a -> alu
    `M ${X.valB} 332 V 340 H 204 V 346`, // forward mux b -> operand mux
    `M 204 340 H ${X.off} V ${Y.exmem}`, // valB bypass -> ex/mem valB
    `M 212 364 V 370`, // operand mux -> alu
    `M ${X.alu} 406 V ${Y.exmem}`, // alu -> ex/mem aluResult
    `M 150 400 H ${X.eq} V ${Y.exmem}`, // alu eq -> ex/mem eq?
    `M ${X.dest} ${B("idex")} V ${Y.exmem}`, // dest
    `M ${X.op} ${B("idex")} V ${Y.exmem}`, // op
  ],
  mem: [
    `M ${X.alu} ${B("exmem")} V ${Y.memwb}`, // aluResult straight through
    `M ${X.alu} 486 H 206`, // aluResult -> data mem addr
    `M ${X.off} ${B("exmem")} V 468`, // valB -> data mem write data
    `M ${X.off} 516 V ${Y.memwb}`, // data mem -> mem/wb mdata
    `M ${X.dest} ${B("exmem")} V ${Y.memwb}`, // dest
    `M ${X.op} ${B("exmem")} V ${Y.memwb}`, // op
  ],
  wb: [
    `M ${X.alu} ${B("memwb")} V 578`, // aluResult -> wb mux
    `M ${X.off} ${B("memwb")} V 578`, // mdata -> wb mux
    `M ${X.wb} 596 V 606 H 22 V 206 H 96`, // data -> reg file
    `M ${X.dest} ${B("memwb")} V 614 H 30 V 220 H 96`, // dest -> reg file
  ],
};

const PATHS = {
  pcFeedback: `M 72 104 H 14 V 6 H 54 V 10`,
  target: `M ${X.pc} ${B("exmem")} V 460 H 6 V 2 H 74 V 10`,
  fwdExmem: `M ${X.alu} 462 H 390 V 306 H 120 V 314 M 180 306 V 314`,
  fwdWb: `M ${X.wb} 606 H 396 V 310 H 140 V 314 M 200 310 V 314`,
};

// stage bands for hover, in y
const BANDS: { stage: Stage; y0: number; y1: number }[] = [
  { stage: "if", y0: 0, y1: Y.ifid },
  { stage: "id", y0: Y.ifid, y1: Y.idex },
  { stage: "ex", y0: Y.idex, y1: Y.exmem },
  { stage: "mem", y0: Y.exmem, y1: Y.memwb },
  { stage: "wb", y0: Y.memwb, y1: H },
];

const CAPTION: Record<NonNullable<Focus>, string> = {
  if: "fetch: pc into inst mem, +1 for next pc",
  id: "decode: register read, split offset and dest",
  ex: "execute: alu, operand mux, branch target",
  mem: "memory: lw reads, sw writes at alu address",
  wb: "writeback: alu result or mdata to reg file",
  target: "taken beq: target to pc, flush 3 younger",
  fwdExmem: "forward ex/mem aluResult into the alu",
  fwdWb: "forward writeback data into the alu",
};

// --- components (all stroke/fill currentColor so a group sets the tone) ---

const Mux = ({ x, y, w, h = 16 }: { x: number; y: number; w: number; h?: number }) => (
  <g>
    <polygon
      points={`${x},${y} ${x + w},${y} ${x + w - 6},${y + h} ${x + 6},${y + h}`}
      className="fill-zinc-900"
      stroke="currentColor"
      strokeWidth={1}
    />
    <text x={x + w / 2} y={y + h / 2 + 2} textAnchor="middle" fontSize={6} fill="currentColor">
      mux
    </text>
  </g>
);

const Alu = ({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) => {
  const n = w * 0.1;
  const inset = w * 0.28;
  const cx = x + w / 2;
  return (
    <g>
      <polygon
        points={`${x},${y} ${cx - n},${y} ${cx},${y + h * 0.3} ${cx + n},${y} ${x + w},${y} ${x + w - inset},${y + h} ${x + inset},${y + h}`}
        className="fill-zinc-900"
        stroke="currentColor"
        strokeWidth={1}
      />
      <text x={cx} y={y + h * 0.72} textAnchor="middle" fontSize={8} fill="currentColor">
        {label}
      </text>
    </g>
  );
};

const Box = ({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} className="fill-zinc-900" stroke="currentColor" strokeWidth={1} />
    <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={8} fill="currentColor">
      {label}
    </text>
  </g>
);

const Tag = ({ x, y, anchor = "start", children }: { x: number; y: number; anchor?: "start" | "end"; children: string }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={6} fill="currentColor">
    {children}
  </text>
);

// --- component ------------------------------------------------------------

export const Pipeline = () => {
  const [focus, setFocus] = useState<Focus>(null);

  const wireTone = (stage: Stage) =>
    focus === null ? "text-zinc-700" : focus === stage ? "text-zinc-300" : "text-zinc-800";
  const partTone = (stage: Stage) =>
    focus === null ? "text-zinc-500" : focus === stage ? "text-zinc-200" : "text-zinc-700";
  const pathTone = (key: keyof typeof PATHS) =>
    focus === key ? "text-amber-500" : focus === null ? "text-zinc-700" : "text-zinc-800";

  return (
    <div className="text-[11px] text-zinc-400 select-none">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* hover bands: under everything, the only things that take the pointer */}
        {BANDS.map((b) => (
          <rect
            key={b.stage}
            x={40}
            y={b.y0}
            width={348}
            height={b.y1 - b.y0}
            fill="transparent"
            onMouseEnter={() => setFocus(b.stage)}
            onMouseLeave={() => setFocus(null)}
          />
        ))}

        <g className="pointer-events-none" fill="none" strokeWidth={1}>
          {/* wires */}
          {(Object.keys(WIRES) as Stage[]).map((stage) => (
            <g key={stage} className={wireTone(stage)} stroke="currentColor">
              {WIRES[stage].map((d, k) => (
                <path key={k} d={d} />
              ))}
            </g>
          ))}
          <path d={PATHS.pcFeedback} className={wireTone("if")} stroke="currentColor" />
          <path d={PATHS.target} className={pathTone("target")} stroke="currentColor" />
          <path d={PATHS.fwdExmem} className={pathTone("fwdExmem")} stroke="currentColor" />
          <path d={PATHS.fwdWb} className={pathTone("fwdWb")} stroke="currentColor" />

          {/* if */}
          <g className={partTone("if")}>
            <Mux x={44} y={10} w={40} />
            <rect x={48} y={30} width={32} height={18} className="fill-zinc-900" stroke="currentColor" />
            <text x={64} y={42} textAnchor="middle" fontSize={8} fill="currentColor">pc</text>
            <text x={82} y={66} textAnchor="middle" fontSize={7} fill="currentColor">1</text>
            <Alu x={52} y={72} w={40} h={24} label="+" />
            <Box x={190} y={36} w={104} h={56} label="inst mem" />
          </g>

          {/* id */}
          <g className={partTone("id")}>
            <Tag x={126} y={166} anchor="end">regA</Tag>
            <Tag x={186} y={166} anchor="end">regB</Tag>
            <Tag x={252} y={166}>offset</Tag>
            <Tag x={286} y={176} anchor="end">bits 0-2</Tag>
            <Tag x={306} y={188}>bits 16-18</Tag>
            <Tag x={354} y={166}>op</Tag>
            <rect x={96} y={172} width={128} height={76} className="fill-zinc-900" stroke="currentColor" />
            {Array.from({ length: 8 }).map((_, k) => (
              <text key={k} x={104} y={182 + k * 9} fontSize={6.5} fill="currentColor">
                r{k}
              </text>
            ))}
            <text x={218} y={243} textAnchor="end" fontSize={7} fill="currentColor">reg file</text>
            <Tag x={92} y={204} anchor="end">data</Tag>
            <Tag x={92} y={218} anchor="end">dest</Tag>
            <Mux x={282} y={226} w={28} h={18} />
          </g>

          {/* ex */}
          <g className={partTone("ex")}>
            <Alu x={52} y={352} w={40} h={24} label="+" />
            <Mux x={114} y={314} w={32} h={18} />
            <Mux x={174} y={314} w={32} h={18} />
            <Mux x={196} y={346} w={32} h={18} />
            <Alu x={116} y={370} w={124} h={36} label="alu" />
            <Tag x={122} y={397}>eq</Tag>
          </g>

          {/* mem */}
          <g className={partTone("mem")}>
            <Box x={206} y={468} w={84} h={48} label="data mem" />
            <Tag x={210} y={482}>addr</Tag>
          </g>

          {/* wb */}
          <g className={partTone("wb")}>
            <Mux x={166} y={578} w={94} h={18} />
          </g>

          {/* pipeline registers */}
          {ROWS.map((row) => {
            const y = Y[row.key];
            return (
              <g key={row.key}>
                <text x={44} y={y - 3} fontSize={7} className="fill-zinc-500">{row.label}</text>
                <rect x={44} y={y} width={340} height={BAR_H} className="fill-zinc-900 stroke-zinc-700" />
                {row.cells.map((c) => (
                  <g key={c.name}>
                    <rect x={c.x0} y={y} width={c.x1 - c.x0} height={BAR_H} className="stroke-zinc-600" />
                    <text
                      x={(c.x0 + c.x1) / 2}
                      y={y + BAR_H / 2 + 3}
                      textAnchor="middle"
                      fontSize={8}
                      className="fill-zinc-300"
                    >
                      {c.name}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </g>

        {/* feedback path hit areas: on top, wide invisible strokes */}
        {(["target", "fwdExmem", "fwdWb"] as const).map((key) => (
          <path
            key={key}
            d={PATHS[key]}
            fill="none"
            stroke="transparent"
            strokeWidth={10}
            pointerEvents="stroke"
            onMouseEnter={() => setFocus(key)}
            onMouseLeave={() => setFocus(null)}
          />
        ))}
      </svg>

      <div className="readout flex justify-between gap-4 pt-3">
        <span className="text-zinc-500 shrink-0">lc2k 5-stage</span>
        <span className={focus === null ? "text-zinc-400" : focus in PATHS ? "text-amber-500" : "text-zinc-300"}>
          {focus ? CAPTION[focus] : "hover to trace"}
        </span>
      </div>
    </div>
  );
};
