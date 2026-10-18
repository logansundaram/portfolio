import { Link, useLocation } from "react-router";
import { Page } from "../components/Page";

export const NotFoundPage = () => {
  const { pathname } = useLocation();

  return (
    <Page title="404. nothing here.">
      <div className="pb-10">
        <h2 className="text-2xl pb-5">not found:</h2>
        <p>
          this route doesn’t exist. it may have moved, or it may never have
          been built.
        </p>
        <pre className="pt-5 whitespace-pre-wrap wrap-anywhere text-sm md:text-base">{`status:   404
path:     ${pathname}`}</pre>
      </div>
      <div>
        <Link to="/" className="text-zinc-400 hover:text-amber-500">
          [ back to about ]
        </Link>
      </div>
    </Page>
  );
};
