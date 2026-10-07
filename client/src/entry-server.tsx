import { renderToString } from "react-dom/server";
import { QueryClient, dehydrate, type DehydratedState } from "@tanstack/react-query";
import App from "./App";

export type Prefetched = { queryKey: unknown[]; data: unknown }[];

/**
 * Renders a page to HTML on the server so crawlers that don't run JavaScript (most AI agents) see the content.
 * Query data the server already fetched is passed in and returned dehydrated, so the browser shows the same
 * page without fetching it again.
 */
export function render(url: string, prefetched: Prefetched = []): { html: string; state: DehydratedState } {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: false } },
  });
  for (const { queryKey, data } of prefetched) queryClient.setQueryData(queryKey, data);
  const html = renderToString(<App queryClient={queryClient} ssrPath={url} />);
  return { html, state: dehydrate(queryClient) };
}
