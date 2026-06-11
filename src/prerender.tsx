/// <reference types="node" />
// prerender.tsx runs only in Node.js (via the SSR build).
// The triple-slash directive above pulls in @types/node so PassThrough
// and Buffer are recognised without adding "node" to the browser tsconfig.
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type StaticHandlerContext,
} from 'react-router';
import { createRouteObjects } from './app/routes';
import { ALL_PAIRS, pairSlug } from './app/data/pairsV3';
import { ARTICLES, articlePath } from './lib/articleRegistry';

const coreRoutes = [
  '/',
  '/convert',
  '/world',
  '/meet',
  '/dev',
  '/news',
  '/journal',
  '/about',
  '/privacy',
  '/terms',
  '/404',
];

export const prerenderRoutes = [
  ...coreRoutes,
  // Static article pages — one prerendered HTML file per article
  ...ARTICLES.map((slug) => articlePath(slug)),
  // Dynamic city-pair pages
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

  // renderToPipeableStream + onAllReady waits for every Suspense boundary
  // (including React.lazy route chunks) to fully resolve before we read the
  // stream. renderToString cannot await lazy imports and would instead emit
  // empty Suspense fallbacks, producing prerendered pages with missing content.
  // renderToPipeableStream uses Node.js streams and works correctly in the CJS
  // SSR build context (renderToReadableStream is browser/Web Streams only).
  return new Promise<{ html: string; head: string; statusCode: number }>((resolve, reject) => {
    let html = '';
    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouterProvider
          router={router}
          context={context as StaticHandlerContext}
          hydrate={false}
        />
      </HelmetProvider>,
      {
        onAllReady() {
          const stream = new PassThrough();
          stream.on('data', (chunk: Buffer) => {
            html += chunk.toString();
          });
          stream.on('end', () => {
            const { helmet } = helmetContext as { helmet: HelmetServerState };
            resolve({
              html,
              head: [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()]
                .filter(Boolean)
                .join('\n'),
              statusCode: (context as StaticHandlerContext).statusCode,
            });
          });
          stream.on('error', reject);
          pipe(stream);
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}
