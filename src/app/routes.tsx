// src/app/routes.tsx
import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Convert } from './pages/Convert';
import { World } from './pages/World';
import { Meet } from './pages/Meet';
import { Dev } from './pages/Dev';
import { PstToEst } from './pages/PstToEst';
import { EstToPst } from './pages/EstToPst';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { RootLayout } from './pages/RootLayout';

interface RouteConfig {
  use24Hour: boolean;
  onToggleFormat: () => void;
}

export const createRouter = (config: RouteConfig) => {
  return createBrowserRouter([
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
          path: 'pst-to-est',
          element: <PstToEst />,
        },
        {
          path: 'est-to-pst',
          element: <EstToPst />,
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
      ],
    },
  ]);
};