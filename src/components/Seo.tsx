import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
}

/**
 * Per-page document title + meta description.
 * Title is rendered as "<title> | TrustedNetworx" (Home passes the full title itself).
 */
const Seo = ({ title, description }: SeoProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default Seo;
