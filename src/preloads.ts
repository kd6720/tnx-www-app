import type { ComponentType } from 'react';

// Module-level registry for the code-split blog route components.
//
// main.tsx resolves the blog chunk BEFORE render on /blog and /blog/:slug and
// stores the resolved default export here. App.tsx then renders the resolved
// component directly at hydration — keeping any <Suspense> boundary out of the
// hydration tree. That matters because React's hydration of a <Suspense>
// boundary expects the server HTML to carry `<!--$-->` comment markers, which
// a react-snap DOM snapshot never contains (react-snap serializes a
// client-rendered tree, not an SSR stream). A Suspense boundary at the root
// therefore fails hydration with #418/#423 and forces a full client re-render.
//
// Suspense + React.lazy is only used for client-side navigation to a blog route
// whose chunk has not been loaded yet (see BlogRoute/BlogPostRoute in App.tsx).
export const preloaded: {
  Blog?: ComponentType;
  BlogPost?: ComponentType;
} = {};
