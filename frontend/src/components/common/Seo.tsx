import React, { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'service';
  keywords?: string[];
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  faqs?: SeoFaqItem[];
  jsonLd?: Record<string, any>;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  image = '/brand/logo.png',
  type = 'website',
  keywords,
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author = 'Berlo Communications Ltd.',
  faqs,
  jsonLd,
}) => {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const baseTitle = t('common.agencyName') || 'Berlo Communications Ltd.';
    const finalTitle = title ? `${title} — ${baseTitle}` : `${baseTitle} — Strategic PR & Communications Agency`;
    document.title = finalTitle;

    const defaultDesc =
      lang === 'bn'
        ? 'বার্লো কমিউনিকেশন্স লিমিটেড — বাংলাদেশের শীর্ষস্থানীয় কৌশলগত জনসংযোগ, করপোরেট মিডিয়া সংযোগ, ক্রাইসিস ম্যানেজমেন্ট ও ব্রান্ড ন্যারেটিভ সংস্থা।'
        : 'Berlo Communications Ltd. — Premier Strategic PR, Media Relations, Corporate Communications & Crisis Advisory Agency in Bangladesh.';

    const finalDesc = description || defaultDesc;
    const siteUrl = 'https://berlocommunications.com';
    const currentPath = window.location.pathname;
    const finalUrl = canonicalUrl || `${siteUrl}${currentPath}`;
    const enPath = currentPath.replace(/^\/(?:en|bn)/, '/en');
    const bnPath = currentPath.replace(/^\/(?:en|bn)/, '/bn');

    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;

    // Helper to set or create meta tags
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Helper to set or create link tags
    const setLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        if (hreflang) tag.setAttribute('hreflang', hreflang);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    // 1. Standard SEO Meta Tags
    setMetaTag('name', 'description', finalDesc);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', author);

    const defaultKeywords = [
      'Strategic PR Bangladesh',
      'Corporate Communications Dhaka',
      'Crisis Management Agency',
      'Media Relations Bangladesh',
      'Public Relations Firm Dhaka',
      'Executive Thought Leadership',
      'Brand Narrative Engineering',
      'বার্লো কমিউনিকেশন্স',
      'জনসংযোগ সংস্থা',
    ];
    setMetaTag('name', 'keywords', (keywords && keywords.length > 0 ? keywords : defaultKeywords).join(', '));

    // 2. Canonical & Hreflang Tags (Crucial for Multilingual SEO)
    setLinkTag('canonical', finalUrl);
    setLinkTag('alternate', `${siteUrl}${enPath}`, 'en');
    setLinkTag('alternate', `${siteUrl}${bnPath}`, 'bn');
    setLinkTag('alternate', `${siteUrl}${enPath}`, 'x-default');

    // 3. Open Graph Tags
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:url', finalUrl);
    setMetaTag('property', 'og:site_name', 'Berlo Communications Ltd.');
    setMetaTag('property', 'og:locale', lang === 'bn' ? 'bn_BD' : 'en_US');

    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      setMetaTag('property', 'article:modified_time', modifiedTime);
    }

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', fullImageUrl);
    setMetaTag('name', 'twitter:site', '@BerloPR');

    // 5. AEO & GEO Structured Data (JSON-LD Knowledge Graph)
    const baseGraph: any[] = [
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#organization`,
        name: 'Berlo Communications Ltd.',
        alternateName: ['Berlo PR', 'Berlo Communications'],
        url: siteUrl,
        logo: `${siteUrl}/brand/logo.png`,
        image: fullImageUrl,
        description: 'Premier Strategic PR, Media Relations, Corporate Communications & Crisis Advisory Agency in Bangladesh.',
        foundingDate: '2012',
        telephone: '+880 1711 268 479',
        email: 'contact@berlocommunications.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Apartment - B3, House - 32/34, Road - 07, Block - C, Niketon',
          addressLocality: 'Gulshan-1',
          addressRegion: 'Dhaka',
          postalCode: '1212',
          addressCountry: 'BD',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.7745,
          longitude: 90.4132,
        },
        areaServed: [
          { '@type': 'Country', name: 'Bangladesh' },
          { '@type': 'Country', name: 'Global' },
        ],
        priceRange: '$$$',
        knowsAbout: [
          'Public Relations',
          'Crisis Communications',
          'Corporate Reputation Architecture',
          'Strategic Media Relations',
          'Executive Thought Leadership',
          'Government Affairs & Policy Advocacy',
          'Digital PR & Online Sentiment Management',
        ],
        sameAs: [
          'https://www.linkedin.com/company/berlo-communications',
          'https://www.facebook.com/berlocommunications',
          'https://twitter.com/BerloPR',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Berlo Communications Ltd.',
        description: defaultDesc,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: [lang === 'bn' ? 'bn-BD' : 'en-US'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/${lang}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${finalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'bn' ? 'হোম' : 'Home',
            item: `${siteUrl}/${lang}`,
          },
          ...(currentPath.split('/').filter(Boolean).length > 1
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title || 'Page',
                  item: finalUrl,
                },
              ]
            : []),
        ],
      },
    ];

    // Answer Engine Optimization (AEO): Inject FAQPage schema if FAQs provided
    if (faqs && faqs.length > 0) {
      baseGraph.push({
        '@type': 'FAQPage',
        '@id': `${finalUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // Merge any custom JSON-LD (e.g. Article schema, Service schema)
    if (jsonLd) {
      baseGraph.push(jsonLd);
    }

    const fullSchema = {
      '@context': 'https://schema.org',
      '@graph': baseGraph,
    };

    let scriptTag = document.getElementById('berlo-seo-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'berlo-seo-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(fullSchema);
  }, [
    title,
    description,
    image,
    type,
    keywords,
    canonicalUrl,
    publishedTime,
    modifiedTime,
    author,
    faqs,
    jsonLd,
    lang,
    t,
  ]);

  return null;
};
