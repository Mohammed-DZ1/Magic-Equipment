import React from 'react';

interface RealEstateProps {
  t: {
    title: string;
    subtitle: string;
    description: string;
    portfolio: string;
    portfolioDesc: string;
    project1: string;
    project1Desc: string;
    project2: string;
    project2Desc: string;
    project3: string;
    project3Desc: string;
    capabilities: string;
    capDesc: string;
  };
}

const RealEstate: React.FC<RealEstateProps> = ({ t }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.portfolio}</h2>
        <p className="text-zinc-400 text-lg">{t.portfolioDesc}</p>
      </div>
      
      {/* Real Estate Image */}
      <div className="mb-16 flex justify-center">
        <div className="w-7/10 max-w-4xl">
          <img 
            src="/real_estate/Untitleddesign2-ezgif.com-gif-to-webp-converter.webp" 
            alt="Real Estate Portfolio" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/20 rounded-lg p-8 sm:p-12 border border-gray-700/30">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 text-center">{t.capabilities}</h3>
          <p className="text-zinc-300 text-center text-lg leading-relaxed">{t.capDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default RealEstate;
