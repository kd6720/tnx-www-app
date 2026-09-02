import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './fonts.css';

// Routes are pre-rendered to static HTML at build time (react-snap). Page
// components are statically imported (no React.lazy), so the first render
// already has the current route and never suspends to a fallback — the source
// of the earlier 0.40 CLS (a Suspense spinner swapping the pre-rendered page,
// making the footer jump). The pre-rendered markup and the re-rendered markup
// are identical, so the swap is visually seamless.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
