import { Page } from "../components/Page";

export const WorkPage = () => {
  return (
    <Page title="things i’ve built.">
      <div className="pb-10">
        <div className="text-2xl pb-5">local agent runtime:</div>
        <p>
          an open-source agent runtime that runs open-weight models entirely on
          local hardware. no api keys, no cloud, no telemetry.
        </p>
        <pre className="pt-5">{`status:   in progress
stack:    rust, llama.cpp, mcp
repo:     https://github.com/logansundaram`}</pre>
      </div>
      <div className="pb-10">
        <div className="text-2xl pb-5">cuda microbenchmarks:</div>
        <p>
          a microbenchmark suite that measures what a blackwell gpu is actually
          doing underneath: memory hierarchy latency, warp scheduling, tensor
          core throughput.
        </p>
        <pre className="pt-5">{`status:   in progress
stack:    cuda, c++, python
repo:     https://github.com/logansundaram`}</pre>
      </div>
      <div className="pb-10">
        <div className="text-2xl pb-5">more:</div>
        <p>coming soon.</p>
      </div>
    </Page>
  );
};
