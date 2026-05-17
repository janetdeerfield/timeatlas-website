import { createBrowserRouter, type RouteObject } from 'react-router';
import { Home } from './pages/Home';
import { Convert } from './pages/Convert';
import { World } from './pages/World';
import { Meet } from './pages/Meet';
import { Dev } from './pages/Dev';
import { DevTestComponents } from './pages/DevTestComponents';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';
import { CityPairPage } from './pages/CityPairPage';
import { ALL_PAIRS, pairSlug } from './data/pairsV3';
import { RootLayout } from './pages/RootLayout';

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
      ...(import.meta.env.DEV
        ? [
            {
              path: 'dev-test-components',
              element: <DevTestComponents />,
            },
          ]
        : []),
      {
        path: 'dev-test-components',
        element: <DevTestComponents />,
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
