import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
import { ALL_PAIRS, pairSlug } from './data/pairsV3';
import { RootLayout } from './pages/RootLayout';

// Lazy-loaded route components — each page becomes its own JS chunk.
// Vite splits these at the dynamic import boundary; the browser only downloads
// the chunk for the current route rather than all 594 KB up front.
// RootLayout and ALL_PAIRS stay eager: the layout shell renders on every route,
// and the pair list is needed immediately to register the city-pair routes.
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Convert = lazy(() => import('./pages/Convert').then((m) => ({ default: m.Convert })));
const World = lazy(() => import('./pages/World').then((m) => ({ default: m.World })));
const Meet = lazy(() => import('./pages/Meet').then((m) => ({ default: m.Meet })));
const Dev = lazy(() => import('./pages/Dev').then((m) => ({ default: m.Dev })));
const News = lazy(() => import('./pages/News').then((m) => ({ default: m.News })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const Journal = lazy(() => import('./pages/Journal').then((m) => ({ default: m.Journal })));
const ArticlePage = lazy(() =>
  import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage }))
);
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
const CityPairPage = lazy(() =>
  import('./pages/CityPairPage').then((m) => ({ default: m.CityPairPage }))
);

interface RouteConfig {
  use24Hour: boolean;
  onToggleFormat: () => void;
}

export const createRouteObjects = (config: RouteConfig): RouteObject[] => [
  {
    path: '/',
    element: <RootLayout use24Hour={config.use24Hour} onToggleFormat={config.onToggleFormat} />,
    children: [
      {
        index: true,
        element: <Home use24Hour={config.use24Hour} />,
      },
      {
        path: 'convert',
        element: <Convert use24Hour={config.use24Hour} />,
      },
      {
        path: 'world',
        element: <World use24Hour={config.use24Hour} />,
      },
      {
        path: 'meet',
        element: <Meet use24Hour={config.use24Hour} />,
      },
      {
        path: 'dev',
        element: <Dev />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'journal/*',
        element: <Journal />,
      },
      {
        path: 'journal/:slug',
        element: <ArticlePage />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },

      // Dynamic city pair routes generated from pairs.json
      ...ALL_PAIRS.map((pair) => ({
        path: pairSlug(pair.source_code, pair.target_code),
        element: <CityPairPage pair={pair} />,
      })),
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const createRouter = (config: RouteConfig) => {
  return createBrowserRouter(createRouteObjects(config));
};
