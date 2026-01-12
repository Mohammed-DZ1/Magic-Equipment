
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RealEstateHero from './components/RealEstateHero';
import HydraulicsHero from './components/HydraulicsHero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SEOHead from './components/SEOHead';
import RealEstate from './components/RealEstate';
import Hydraulics from './components/Hydraulics';
import { LocationSection } from './components/GoogleMap';
import { translations } from './constants/translations';
import { Language } from './types';

type ServiceType = 'equipment' | 'realEstate' | 'hydraulics';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentService, setCurrentService] = useState<ServiceType>('equipment');

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  const t = translations[language];

  const handleSmoothScroll = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    if (!targetId) return;

    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);

  // Helper component to add reveal animation
  const AnimatedSection: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => {
    const ref = React.useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(ref);

    return (
      <section ref={ref} id={id} className={`scroll-mt-20 reveal ${isVisible ? 'is-visible' : ''} py-16 md:py-24`}>
        {children}
      </section>
    );
  };
  
  const useIntersectionObserver = (ref: React.RefObject<HTMLElement>) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          rootMargin: '0px',
          threshold: 0.1
        }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(ref.current);
        }
      };
    }, [ref]);
  
    return isVisible;
  };

  return (
    <div className="text-zinc-300 bg-black">
      <SEOHead language={language} currentService={currentService} />
      <Header language={language} setLanguage={setLanguage} currentService={currentService} onServiceChange={setCurrentService} t={t.header} onNavLinkClick={handleSmoothScroll} />
      <main>
        {currentService === 'equipment' && <Hero t={t.hero} onCtaClick={handleSmoothScroll} />}
        {currentService === 'realEstate' && <RealEstateHero t={t.realEstate} onCtaClick={handleSmoothScroll} />}
        {currentService === 'hydraulics' && <HydraulicsHero t={t.hydraulics} onCtaClick={handleSmoothScroll} />}
        
        {currentService === 'equipment' && (
          <>
            <AnimatedSection id="about">
              <About t={t.about} />
            </AnimatedSection>
            <AnimatedSection id="services">
              <Services t={t.services} />
            </AnimatedSection>
          </>
        )}
        {currentService === 'realEstate' && (
          <AnimatedSection id="real-estate-portfolio">
            <RealEstate t={t.realEstate} />
          </AnimatedSection>
        )}
        {currentService === 'hydraulics' && (
          <AnimatedSection id="hydraulics-portfolio">
            <Hydraulics t={t.hydraulics} />
          </AnimatedSection>
        )}
        <AnimatedSection id="location">
          <LocationSection language={language} />
        </AnimatedSection>
        <AnimatedSection id="contact">
          <Contact t={t.contact} />
        </AnimatedSection>
      </main>
      <Footer t={t.footer}/>
      <Chatbot t={t.chatbot} currentService={currentService} language={language} />
    </div>
  );
};

export default App;
