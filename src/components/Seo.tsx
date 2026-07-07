import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://trustednetworx.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/TrustedNetworx-Hero-Image.jpg`;

interface SeoProps {
  title: string;
  description: string;
  /** Absolute URL or site-relative path (e.g. "/blog-images/x.png"). */
  image?: string;
  type?: 'website' | 'article';
  /** Override the canonical path. Defaults to the current route. */
  canonicalPath?: string;
  noindex?: boolean;
  /** One or more JSON-LD objects to inject as <script type="application/ld+json">. */
  jsonLd?: object | object[];
}

/**
 * Per-page document head: title, meta description, canonical URL,
 * Open Graph + Twitter cards, and optional JSON-LD structured data.
 * Title is passed in full (pages format as "<Page> | TrustedNetworx").
 */
const Seo = ({
  title,
  description,
  image,
  type = 'website',
  canonicalPath,
  noindex,
  jsonLd,
}: SeoProps) => {
  const { pathname } = useLocation();
  const path = canonicalPath ?? pathname;
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_OG_IMAGE;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="TrustedNetworx" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
