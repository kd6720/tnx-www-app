import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './fonts.css';

// Routes are pre-rendered to static HTML at build time (react-snap) so
// crawlers and AI engines see full content. On load, React re-renders the
// app from scratch (route chunks are lazy, so hydration would mismatch);
// the static markup is identical, so the swap is visually seamless.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
