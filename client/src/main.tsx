import { createRoot } from "react-dom/client";
import { hydrate } from "@tanstack/react-query";
import App from "./App";
import { queryClient } from "./lib/queryClient";
import "./index.css";

// Data the server used to render this page (server/static.ts), so the page doesn't refetch and flash a spinner.
const state = (window as { __RQ_STATE__?: unknown }).__RQ_STATE__;
if (state) hydrate(queryClient, state);

// createRoot (not hydrateRoot) replaces the server HTML, so locale or date differences can't cause mismatches.
createRoot(document.getElementById("root")!).render(<App queryClient={queryClient} />);
