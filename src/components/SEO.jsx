import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.binyah-masiyah-digital.sa';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEO({ title, description, path = '/', image = DEFAULT_IMAGE, lang = 'ar' }) {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BMD - البنية الماسية الرقمية" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_SA' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
