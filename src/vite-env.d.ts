/// <reference types="vite/client" />

interface Window {
  /** Set by Seo's effect once Helmet has committed; react-snap waits for it. */
  __seoReady?: boolean;
}
