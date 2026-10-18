import { Page } from "../components/Page";

interface Entry {
  title: string;
  summary: string;
  bullets: string[];
  meta: [string, string][];
}

const entries: Entry[] = [
  {
    title: "saturn, a local agent runtime",
    summary:
      "an open-source, local-first agent runtime that runs open-weight models entirely on local hardware. no api keys, no cloud, no telemetry. plan → execute → rectify, 15 gated tools, mcp server support, and a sqlite audit store that replays any run offline from a signed export.",
    bullets: [
      "cut structured-output parse failures 33/66 → 0 and lifted a 4b model from 40% to 94% on a fixed 22-case suite at 4.7× lower latency, by replacing json schema ($ref/$defs) with flat schemas, a shape hint, json salvage, and temperature-escalating retries.",
      "replaced a fixed confidence cutoff, off by an order of magnitude across model sizes, with per-model calibration from sampled-token log-probabilities: percentile enter/exit thresholds with hysteresis, over 55 prompts across six model tags.",
      "interrupt-and-correct decoding: the stream freezes at a word boundary, you edit the prefix, and generation resumes through the chat template with the prefix re-tokenized as a string, so a mid-token edit cannot corrupt the decode.",
      "trust benchmark for grounding, approval-gate coverage, prompt-injection quarantine, and a fail-closed semantic write gate: 6/6 grounded, 3/3 gated calls prompted with 0 false prompts, 2/2 injections fenced, 2/2 fabricated writes blocked.",
    ],
    meta: [
      ["status", "in progress (nov 2025 – present)"],
      ["stack", "rust, llama.cpp, mcp, sqlite"],
      ["size", "41k loc, 1,152 tests, mit"],
      ["repo", "https://github.com/logansundaram"],
      ["site", "https://saturdayai.org"],
    ],
  },
  {
    title: "gpu memory hierarchy & llm decode roofline",
    summary:
      "an open-source cuda microbenchmark suite that measures the blackwell memory hierarchy (rtx 5070 ti, sm_120) from first principles, and a decode-throughput roofline built on top of it.",
    bullets: [
      "818 gb/s sustained dram read (91% of 896 gb/s theoretical), 5.05× l2-to-dram bandwidth ratio, l1/l2/dram pointer-chase latency of 44.6 / 352.5 / 749 cycles, saturation at 4 warps/sm.",
      "every point within 1.16% across independent runs: sm clock locked with a guard that aborts unlocked runs, medians over 10+ reps, and every number traceable to a csv stamped with driver, cuda, clock, and git hash.",
      "roofline with Q4_K_M / Q6_K / Q8_0 predictions committed to git before any llama.cpp run; measured Qwen3-8B at 120.9 / 98.6 / 80.7 tok/s, 83–92% of the weights+kv prediction at under 1.1% spread.",
    ],
    meta: [
      ["status", "summer – fall 2026"],
      ["stack", "cuda, c++, python, llama.cpp"],
      ["repo", "https://github.com/logansundaram"],
    ],
  },
  {
    title: "llm control for a quantum photonics testbed",
    summary:
      "undergraduate research in the quantum networking lab (umich ece, pi: zheshen zhang): llm-driven control for a live quantum photonics testbed.",
    bullets: [
      "closed-loop experiment configuration and routing-path selection driven by measured device state rather than static parameters.",
      "hardware-facing acquisition layer: instrument protocols and timing-critical data paths for single-photon detectors and time-taggers, streaming physical-layer telemetry into structured datasets for model training.",
    ],
    meta: [
      ["status", "in progress (aug 2026 – present)"],
      ["role", "undergraduate researcher"],
    ],
  },
  {
    title: "solar car high voltage & systems",
    summary:
      "battery pack modeling and bms hardware for the university of michigan solar car team.",
    bullets: [
      "designed a board-level voc-sensing subsystem integrated into the existing bms, balancing power, signal integrity, and size/cost.",
      "built the single-cell and full-pack r-2rc equivalent-circuit model: hppc and c/20 ocv characterization of candidate cells, r0/r1/r2/c1/c2 parameterized vs. state of charge from pulse data, simulated terminal voltage validated against test data.",
      "drive race-pack cell and series/parallel selection by simulating candidate configurations over race drive cycles in about:energy and matlab/simulink (impedance loss, efficiency, thermal), and implemented coulomb-counting soc firmware.",
    ],
    meta: [
      ["status", "ongoing (aug 2025 – present)"],
      ["stack", "matlab/simulink, about:energy"],
    ],
  },
  {
    title: "cpu-only analysis agent",
    summary:
      "research internship in ai engineering at the university of michigan transportation research institute: a natural-language analysis agent over a 108-column dataset, running on cpu-only hardware.",
    bullets: [
      "cut most queries to one llm call by replacing a langgraph/rag stack with a deterministic tool-calling loop, chosen on measured evidence.",
      "cut per-turn prefill ~25s → 3.6s by enforcing a byte-identical kv-cache prefix across turns and sessions; held the 16,384-token budget with a 26% prelude reduction and automatic transcript compaction.",
      "halved memory and cut latency 18% by benchmarking six open-weight models on a routing/argument/ground-truth matrix and right-sizing to a 4b model; tuned it from a 74% baseline to 172/172 as the suite grew.",
      "cut adversarial false passes 22/29 → 1/30 with a 949-test, ten-suite evaluation gate: ground-truth grading, a retryable/terminal failure taxonomy, noise modeling, and silent-wrong detection.",
    ],
    meta: [
      ["status", "shipped (may – sep 2026)"],
      ["role", "research intern, ai engineering"],
    ],
  },
];

const metaBlock = (meta: [string, string][]) =>
  meta.map(([k, v]) => `${(k + ":").padEnd(10)}${v}`).join("\n");

export const WorkPage = () => {
  return (
    <Page title="things i’ve built.">
      {entries.map((e) => (
        <div key={e.title} className="pb-10">
          <div className="text-2xl pb-5">{e.title}:</div>
          <p>{e.summary}</p>
          <ul className="pt-4 flex flex-col gap-2 text-zinc-400">
            {e.bullets.map((b) => (
              <li key={b} className="pl-4 -indent-4">
                - {b}
              </li>
            ))}
          </ul>
          <pre className="pt-5 whitespace-pre-wrap wrap-anywhere text-sm md:text-base">
            {metaBlock(e.meta)}
          </pre>
        </div>
      ))}
    </Page>
  );
};
