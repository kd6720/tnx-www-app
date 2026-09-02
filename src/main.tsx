import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { preloaded } from './preloads';
import './index.css';
import './fonts.css';

// Blog/BlogPost are the only code-split routes (React.lazy in App.tsx) — the
// blog content (61 markdown posts via blog.ts) is the one heavy chunk. Resolve
// that chunk before render on /blog and /blog/:slug and stash the resolved
// component in the preloads registry so App renders it directly (no <Suspense>
// in the hydration tree). See src/preloads.ts for why that avoids the
// #418/#423 hydration failures the root Suspense boundary was causing.
async function bootstrap() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathname === '/blog') {
    try {
      const mod = await import('./pages/Blog');
      preloaded.Blog = mod.default;
    } catch {
      // Chunk failed to prefetch — render immediately; <Suspense> handles it.
    }
  } else if (pathname.startsWith('/blog/')) {
    try {
      const mod = await import('./pages/BlogPost');
      preloaded.BlogPost = mod.default;
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
    hydrateRoot(container, app, {
      // Surface recoverable hydration errors (React #418/#423) so CI/local
      // verification can assert zero of them. Fires only on actual recoverable
      // mismatches; a clean hydration stays silent.
      onRecoverableError: (error: unknown, errorInfo?: { componentStack?: string }) => {
        console.error('[hydration] recoverable error:', error);
        if (errorInfo?.componentStack) {
          console.error('[hydration] stack:', errorInfo.componentStack.split('\n').slice(0, 6).join(' | '));
        }
      },
    });
  } else {
    createRoot(container).render(app);
  }
}

bootstrap();
