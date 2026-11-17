import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
}

export const Seo: React.FC<SeoProps> = ({ title, description, image = '/brand/logo.png' }) => {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const baseTitle = t('common.agencyName') || 'Berlo Communications Ltd.';
    const finalTitle = title ? `${title} — ${baseTitle}` : `${baseTitle} — Strategic PR & Communications Agency`;
    document.title = finalTitle;

    const defaultDesc =
      lang === 'bn'
        ? 'বার্লো কমিউনিকেশন্স লিমিটেড — বাংলাদেশের শীর্ষস্থানীয় কৌশলগত জনসংযোগ, প্রাতিষ্ঠানিক যোগাযোগ ও ক্রাইসিস ম্যানেজমেন্ট সংস্থা।'
        : 'Berlo Communications Ltd. — Premier Strategic PR, Media Relations, Corporate Communications & Brand Storytelling Agency in Bangladesh.';

    const finalDesc = description || defaultDesc;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDesc);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', image);
  }, [title, description, image, lang, t]);

  return null;
};

