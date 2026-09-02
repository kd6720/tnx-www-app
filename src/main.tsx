import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './fonts.css';

// Blog/BlogPost are the only code-split routes (React.lazy in App.tsx) — the
// blog content (61 markdown posts via blog.ts) is the one heavy chunk. Resolve
// that chunk before render on /blog and /blog/:slug so the lazy component never
// suspends to a visible fallback on first load (no CLS).
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

  const container = document.getElementById('root')!;
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );

  // react-snap's crawler sets userAgent "ReactSnap" and serves a fresh (empty)
  // root — always render from scratch there (avoids a hydration mismatch on the
  // pages react-snap re-crawls after writing them). At runtime the root carries
  // the prerendered DOM, so hydrate to reuse it — faster FCP, no re-render.
  const isPrerender = navigator.userAgent.includes('ReactSnap');
  if (isPrerender) {
    createRoot(container).render(app);
  } else if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}

bootstrap();
