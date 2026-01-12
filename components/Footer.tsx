
import React from 'react';

interface FooterProps {
  t: {
    copy: string;
  };
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-zinc-900/50 border-t border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center text-zinc-500">
        <p className="text-xs sm:text-sm">{t.copy}</p>
      </div>
    </footer>
  );
};

export default Footer;