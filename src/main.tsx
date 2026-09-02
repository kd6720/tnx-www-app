import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './fonts.css';

// Blog/BlogPost are the only code-split routes (React.lazy in App.tsx) — the
// blog content (61 markdown posts via blog.ts) is the one heavy chunk. For
// /blog and /blog/:slug we resolve that chunk BEFORE rendering, so the lazy
// component never suspends to a visible fallback on first load (keeps CLS at
// zero). Every other page stays statically imported in the main bundle.
async function bootstrap() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathname === '/blog') {
    try {
      await import('./pages/Blog');
    } catch {
      // Chunk failed to prefetch — render immediately; <Suspense> handles it.
    }
  } else if (pathname.startsWith('/blog/')) {
    try {
      await import('./pages/BlogPost');
    } catch {
      // Chunk failed to prefetch — render immediately; <Suspense> handles it.
    }
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();
