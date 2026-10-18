import { Page } from "../components/Page";

export const NotesPage = () => {
  return (
    <Page title="things i’m figuring out.">
      <div className="pb-10">
        <div className="text-2xl pb-5">notes:</div>
        <p>
          short writeups on things i’ve measured, read, or gotten wrong.
          mostly gpus, computer architecture, and running models locally.
        </p>
      </div>
      <div className="pb-10">
        <div className="text-2xl pb-5">recent:</div>
        <pre>{`2026-10-xx  what a blackwell sm actually does per cycle     (draft)
2026-09-xx  measuring l2 latency with pointer chasing        (draft)
2026-09-xx  notes on eecs 470: tomasulo from the ground up   (draft)`}</pre>
      </div>
    </Page>
  );
};
