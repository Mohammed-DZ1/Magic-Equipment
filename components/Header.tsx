
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { MenuIcon, CloseIcon } from './icons';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentService: 'equipment' | 'realEstate' | 'hydraulics';
  onServiceChange: (service: 'equipment' | 'realEstate' | 'hydraulics') => void;
  t: {
    home: string;
    about: string;
    services: string;
    findUs: string;
    contact: string;
    equipment: string;
    realEstate: string;
    hydraulics: string;
  };
  onNavLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, currentService, onServiceChange, t, onNavLinkClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t.home },
    { href: '#about', label: t.about },
    { href: '#services', label: t.services },
    { href: '#location', label: t.findUs },
    { href: '#contact', label: t.contact },
  ];

  const serviceLinks = [
    { id: 'equipment', label: t.equipment },
    { id: 'realEstate', label: t.realEstate },
    { id: 'hydraulics', label: t.hydraulics },
  ];
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onNavLinkClick(event);
    
    // Close mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg shadow-lg shadow-black/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#home" className="flex items-center gap-2 sm:gap-3 flex-shrink-0" onClick={handleNavClick}>
              <img src="https://i.ibb.co/yBFr1gBD/logo.png" alt="Magic Equipment Logo" className="h-10 sm:h-12 w-10 sm:w-12 rounded-full object-cover" />
              <h1 className="text-lg sm:text-2xl font-black text-white tracking-wider">MAGIC <span className="text-gray-300">EQUIPMENT</span></h1>
            </a>
            <nav className="hidden md:flex md:space-x-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={handleNavClick} className="text-gray-400 hover:text-gray-200 transition-colors duration-300 font-medium">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-zinc-800 p-1 rounded-full flex text-xs sm:text-sm font-semibold gap-1 sm:gap-0">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 sm:px-3 py-1 rounded-full transition-colors duration-300 font-semibold text-xs sm:text-sm ${language === 'en' ? 'bg-gradient-to-b from-gray-500 to-gray-700 text-white shadow-lg shadow-black/40 ring-1 ring-gray-400/50' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-2 sm:px-3 py-1 rounded-full transition-colors duration-300 font-semibold text-xs sm:text-sm ${language === 'fr' ? 'bg-gradient-to-b from-gray-500 to-gray-700 text-white shadow-lg shadow-black/40 ring-1 ring-gray-400/50' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-2 sm:px-3 py-1 rounded-full transition-colors duration-300 font-semibold text-xs sm:text-sm ${language === 'ar' ? 'bg-gradient-to-b from-gray-500 to-gray-700 text-white shadow-lg shadow-black/40 ring-1 ring-gray-400/50' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  AR
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden ml-3">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <CloseIcon className="block h-6 w-6" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Service tabs */}
          <div className="flex justify-center gap-2 pb-4 flex-wrap">
            {serviceLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onServiceChange(link.id as 'equipment' | 'realEstate' | 'hydraulics')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  currentService === link.id 
                    ? 'bg-gradient-to-b from-gray-500 to-gray-700 text-white shadow-lg shadow-black/40 ring-1 ring-gray-400/50 hover:shadow-xl' 
                    : 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      >
        <div className="bg-black/50 absolute inset-0"></div>
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-black shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 pt-20">
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-gray-300 hover:text-gray-100 transition-colors duration-300 font-semibold text-xl py-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
