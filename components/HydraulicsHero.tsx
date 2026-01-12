import React from 'react';

interface HydraulicsHeroProps {
  t: {
    subtitle: string;
    title: string;
    description: string;
  };
  onCtaClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HydraulicsHero: React.FC<HydraulicsHeroProps> = ({ t, onCtaClick }) => {
  return (
    <section id="hydraulics-hero" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900/30 to-black/80 z-10"></div>
      <div className="absolute inset-0 w-full h-full" style={{
        backgroundImage: 'url("https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <p className="text-gray-400 text-sm sm:text-base font-semibold mb-3 sm:mb-4 tracking-widest uppercase">
          {t.subtitle}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg sm:text-2xl text-zinc-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>
        <a
          href="#contact"
          onClick={onCtaClick}
          className="inline-block px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-b from-gray-500 to-gray-700 text-white font-bold rounded-lg shadow-xl shadow-black/50 ring-1 ring-gray-400/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 text-base sm:text-lg"
        >
          Start Your Project
        </a>
      </div>
    </section>
  );
};

export default HydraulicsHero;
