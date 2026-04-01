import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { createRouter } from './routes';

export default function App() {
  const [use24Hour, setUse24Hour] = useState(() => {
    const saved = localStorage.getItem('use24Hour');
    return saved ? JSON.parse(saved) : false;
  });

  const [router, setRouter] = useState(() => createRouter({ use24Hour, onToggleFormat: () => setUse24Hour(!use24Hour) }));

  useEffect(() => {
    localStorage.setItem('use24Hour', JSON.stringify(use24Hour));
    setRouter(createRouter({ use24Hour, onToggleFormat: () => setUse24Hour(!use24Hour) }));
  }, [use24Hour]);

  return <RouterProvider router={router} />;
}