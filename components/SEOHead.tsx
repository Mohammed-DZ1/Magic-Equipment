import React, { useEffect } from 'react';
import { Language } from '../types';

interface SEOHeadProps {
  language: Language;
  currentService: 'equipment' | 'realEstate' | 'hydraulics';
}

const SEOHead: React.FC<SEOHeadProps> = ({ language, currentService }) => {
  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = `${window.location.origin}${window.location.pathname}`;
    }

    // Update OG tags dynamically
    updateMetaTag('og:url', window.location.href);
    updateMetaTag('og:locale', getLocale(language));
    
  }, [language, currentService]);

  const updateMetaTag = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  const getLocale = (lang: Language): string => {
    switch(lang) {
      case 'fr': return 'fr_FR';
      case 'ar': return 'ar_DZ';
      default: return 'en_US';
    }
  };

  const getServiceDescription = (): { title: string; description: string; keywords: string } => {
    const descriptions = {
      equipment: {
        en: {
          title: 'Heavy Equipment Rental | Magic Equipment | Oran, Mascara, Algeria',
          description: 'Rent heavy equipment including mobile crane trucks, backhoe loaders, and Shacman trucks for construction and industrial projects in Oran and Mascara. Professional equipment rental services since 2010.',
          keywords: 'heavy equipment rental, equipment rental, construction machinery, mobile crane rental, backhoe loader rental, Shacman truck rental, equipment for rent, professional equipment rental'
        },
        fr: {
          title: 'Location Équipements Lourds | Magic Equipment | Oran, Mascara, Algérie',
          description: 'Louez des équipements lourds incluant camions grues mobiles, tractopelles et camions Shacman pour projets de construction et industriels à Oran et Mascara. Services de location d\'équipements professionnels depuis 2010.',
          keywords: 'location équipements lourds, location d\'engins, location matériel construction, location grue mobile, location tractopelle, location camion Shacman, équipements à louer'
        },
        ar: {
          title: 'تأجير معدات ثقيلة | ماجيك للمعدات | وهران، معسكر، الجزائر',
          description: 'استأجر معدات ثقيلة تشمل شاحنات رافعات متنقلة وجرافات وشاحنات شاكمان لمشاريع البناء والصناعة في وهران ومعسكر. خدمات تأجير معدات احترافية منذ 2010.',
          keywords: 'تأجير معدات ثقيلة, تأجير معدات, معدات البناء, تأجير رافعة متنقلة, تأجير جرافة, تأجير شاحنة شاكمان'
        }
      },
      realEstate: {
        en: {
          title: 'Luxury Residential Properties | Real Estate Investment | Magic Equipment',
          description: 'Discover luxury residential properties and real estate investment opportunities. Modern family homes, luxury villas, and apartment complexes in Oran and Mascara. Premium real estate services by Magic Equipment.',
          keywords: 'real estate, luxury homes, residential properties, villa for sale, apartment for sale, property investment, home for sale, luxury real estate, real estate investment'
        },
        fr: {
          title: 'Propriétés Résidentielles de Luxe | Investissement Immobilier | Magic Equipment',
          description: 'Découvrez les propriétés résidentielles de luxe et les opportunités d\'investissement immobilier. Maisons modernes, villas de luxe et complexes d\'appartements à Oran et Mascara. Services immobiliers premium par Magic Equipment.',
          keywords: 'immobilier, maisons de luxe, propriétés résidentielles, villa à vendre, appartement à vendre, investissement immobilier, maison pour vendre'
        },
        ar: {
          title: 'عقارات سكنية فاخرة | استثمار عقاري | ماجيك للمعدات',
          description: 'اكتشف العقارات السكنية الفاخرة وفرص الاستثمار العقاري. منازل حديثة وفلل فاخرة ومجمعات شقق في وهران ومعسكر. خدمات عقارية فاخرة من قبل ماجيك للمعدات.',
          keywords: 'عقارات, منازل فاخرة, عقارات سكنية, فيلا للبيع, شقة للبيع, استثمار عقاري'
        }
      },
      hydraulics: {
        en: {
          title: 'Heavy Construction & Hydraulic Systems | Infrastructure Projects | Magic Equipment',
          description: 'Professional hydraulic systems installation, deep excavation, and infrastructure construction services. Specialized in pipeline installation and municipal water systems. Expert heavy construction contractor.',
          keywords: 'hydraulic systems, construction services, heavy construction, excavation services, pipeline installation, infrastructure construction, hydraulic contractor, deep excavation'
        },
        fr: {
          title: 'Construction Lourde & Systèmes Hydrauliques | Projets Infrastructure | Magic Equipment',
          description: 'Services professionnels d\'installation de systèmes hydrauliques, excavation profonde et construction d\'infrastructure. Spécialisé dans l\'installation de pipelines et systèmes d\'eau municipaux. Entrepreneur construction lourde expert.',
          keywords: 'systèmes hydrauliques, services construction, construction lourde, services excavation, installation pipeline, construction infrastructure, entrepreneur hydraulique'
        },
        ar: {
          title: 'البناء الثقيل و الأنظمة الهيدروليكية | مشاريع البنية التحتية | ماجيك للمعدات',
          description: 'خدمات احترافية لتركيب الأنظمة الهيدروليكية والتنقيب العميق وبناء البنية التحتية. متخصصة في تركيب الأنابيب وأنظمة المياه البلدية. مقاول بناء ثقيل خبير.',
          keywords: 'أنظمة هيدروليكية, خدمات بناء, بناء ثقيل, خدمات تنقيب, تركيب أنابيب, بناء بنية تحتية'
        }
      }
    };

    return descriptions[currentService][language];
  };

  const serviceData = getServiceDescription();

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Magic Equipment',
    'image': 'https://i.ibb.co/yBFr1gBD/logo.png',
    'description': 'Integrated construction company offering equipment rental, real estate development, and hydraulic systems installation in Algeria',
    'url': 'https://magicequipment.com',
    'telephone': '+213-541-725-080',
    'email': 'magicequipment.contact@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Oran, Mascara',
      'addressCountry': 'DZ',
      'addressRegion': 'Algeria'
    },
    'areaServed': ['Oran', 'Mascara', 'Algeria'],
    'foundingDate': '2010',
    'sameAs': [
      'https://www.facebook.com/magicequipment',
      'https://www.instagram.com/magicequipment'
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '50'
    }
  };

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{serviceData.title}</title>
      <meta name="description" content={serviceData.description} />
      <meta name="keywords" content={serviceData.keywords} />
      <meta name="language" content={language} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      
      {/* Robots & Indexing */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, snippet, imageindex" />
      
      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={serviceData.title} />
      <meta property="og:description" content={serviceData.description} />
      <meta property="og:image" content="https://i.ibb.co/yBFr1gBD/logo.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
      <meta property="og:locale" content={getLocale(language)} />
      <meta property="og:site_name" content="Magic Equipment" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={serviceData.title} />
      <meta name="twitter:description" content={serviceData.description} />
      <meta name="twitter:image" content="https://i.ibb.co/yBFr1gBD/logo.png" />
      <meta name="twitter:site" content="@MagicEquipmentDZ" />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Magic Equipment" />
      <meta name="publisher" content="Magic Equipment" />
      <meta name="creator" content="ALGEOSYS" />
      <meta name="revisit-after" content="7" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Geo Tags */}
      <meta name="geo.placename" content="Oran, Mascara, Algeria" />
      <meta name="geo.position" content="35.72036790000001|-0.5951550000000001" />
      <meta name="ICBM" content="35.72036790000001, -0.5951550000000001" />
      
      {/* Color & Theme */}
      <meta name="theme-color" content="#d97706" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional Service-Specific Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': currentService === 'equipment' ? 'EquipmentRentalService' : 
                   currentService === 'realEstate' ? 'RealEstateAgent' : 'ConstructionService',
          'name': `Magic Equipment - ${currentService === 'equipment' ? 'Equipment Rental' : currentService === 'realEstate' ? 'Real Estate' : 'Construction Services'}`,
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'Magic Equipment',
            'url': 'https://magicequipment.com'
          },
          'areaServed': ['Oran', 'Mascara'],
          'availableLanguage': ['en', 'fr', 'ar']
        })}
      </script>
    </>
  );
};

export default SEOHead;
