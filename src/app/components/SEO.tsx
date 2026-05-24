import { Helmet } from 'react-helmet-async';

const DEFAULT_OG_IMAGE = 'https://timeatlas.co/og-image.webp';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  robots?: string;
  ogImage?: string;
}

export function SEO({
  title,
  description,
  path,
  type = 'website',
  robots = 'index,follow',
  ogImage = DEFAULT_OG_IMAGE,
}: SEOProps) {
  const siteUrl = 'https://timeatlas.co';
  const fullUrl = `${siteUrl}${path}`;
  const siteName = 'TimeAtlas';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}
