import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type StaticHandlerContext,
} from 'react-router';
import { createRouteObjects } from './app/routes';
import { cityPairs } from './app/data/cityPairs';

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

export const prerenderRoutes = [...coreRoutes, ...cityPairs.map((page) => `/${page.slug}`)];

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
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouterProvider
        router={router}
        context={context as StaticHandlerContext}
        hydrate={false}
      />
    </HelmetProvider>
  );
  const { helmet } = helmetContext as { helmet: HelmetServerState };

  return {
    html,
    head: [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()]
      .filter(Boolean)
      .join('\n'),
    statusCode: context.statusCode,
  };
}
