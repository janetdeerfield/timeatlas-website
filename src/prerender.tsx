import { renderToReadableStream } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type StaticHandlerContext,
} from 'react-router';
import { createRouteObjects } from './app/routes';
import { ALL_PAIRS, pairSlug } from './app/data/pairsV3';

const coreRoutes = [
  '/',
  '/convert',
  '/world',
  '/meet',
  '/dev',
  '/about',
  '/privacy',
  '/terms',
  '/404',
];

export const prerenderRoutes = [
  ...coreRoutes,
  ...ALL_PAIRS.map((pair) => `/${pairSlug(pair.source_code, pair.target_code)}`),
];

export async function renderPath(path: string) {
  const routes = createRouteObjects({
    use24Hour: false,
    onToggleFormat: () => {},
  });
  const handler = createStaticHandler(routes);
  const request = new Request(`https://timeatlas.co${path}`);
  const context = await handler.query(request);

  if (context instanceof Response) {
    throw new Error(`Unable to prerender ${path}: received HTTP ${context.status}`);
  }

  const router = createStaticRouter(handler.dataRoutes, context as StaticHandlerContext);
  const helmetContext = {};

  // renderToReadableStream + allReady waits for every Suspense boundary
  // (including React.lazy route chunks) to fully resolve before we read the
  // stream. renderToString cannot await lazy imports and would instead emit
  // empty Suspense fallbacks, producing prerendered pages with missing content.
  // renderToReadableStream uses Web Streams (no Node.js types required) and is
  // directly supported by the DOM lib already in tsconfig.
  const stream = await renderToReadableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouterProvider
        router={router}
        context={context as StaticHandlerContext}
        hydrate={false}
      />
    </HelmetProvider>
  );

  await stream.allReady;

  const html = await new Response(stream).text();
  const { helmet } = helmetContext as { helmet: HelmetServerState };

  return {
    html,
    head: [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()]
      .filter(Boolean)
      .join('\n'),
    statusCode: (context as StaticHandlerContext).statusCode,
  };
}
