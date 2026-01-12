
import React from 'react';

interface HeroProps {
  t: {
    subtitle: string;
    title: string;
    description: string;
    cta: string;
  };
  onCtaClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Hero: React.FC<HeroProps> = ({ t, onCtaClick }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ 
          backgroundImage: 'url(/rent/Hero-ezgif.com-speed.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)'
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)' }} />

      {/* Content overlay */}
      <div className="relative z-10 max-w-2xl px-6">
        <p className="text-lg mb-4 text-gray-300">{t.subtitle}</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.title}</h1>
        <p className="text-xl mb-8 text-gray-200">{t.description}</p>
        <a 
          href="#services" 
          onClick={onCtaClick}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
};

export default Hero;
