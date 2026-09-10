/// <reference types="vite/client" />

interface Window {
  /** Set by Seo's effect once Helmet has committed; react-snap waits for it. */
  __seoReady?: boolean;
}

/** Build-time map of public/blog-images files to content hashes (see vite.config.ts). */
declare const __BLOG_IMAGE_VERSIONS__: Record<string, string>;
