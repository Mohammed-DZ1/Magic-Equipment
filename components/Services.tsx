
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface ServicesProps {
  t: {
    title: string;
    description: string;
    mobileCraneTruck: string;
    mobileCraneTruck_desc: string;
    backhoeLoader: string;
    backhoeLoader_desc: string;
    shacmanTrucks: string;
    shacmanTrucks_desc: string;
  };
}

const ServiceCard: React.FC<{ title: string; description: string; imageUrls: string[] }> = ({ title, description, imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <div className="perspective-container">
      <div className="bg-zinc-800/50 rounded-lg overflow-hidden shadow-lg shadow-black/10 card-3d h-full flex flex-col">
        <div className="relative group">
          <img src={imageUrls[currentIndex]} alt={title} className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-opacity duration-300"/>
          {imageUrls.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute top-1/2 left-1 sm:left-2 -translate-y-1/2 bg-black/40 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-black/60" aria-label="Previous image">
                <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button onClick={nextImage} className="absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 bg-black/40 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-black/60" aria-label="Next image">
                <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setCurrentIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 flex-1 text-sm sm:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};


const Services: React.FC<ServicesProps> = ({ t }) => {
  const services = [
    { 
      title: t.mobileCraneTruck, 
      description: t.mobileCraneTruck_desc, 
      imageUrls: [
        'https://i.ibb.co/Y7dQGfyK/G1.jpg',
        'https://i.ibb.co/hxVTpNGK/G2.png',
      ] 
    },
    { 
      title: t.backhoeLoader, 
      description: t.backhoeLoader_desc, 
      imageUrls: [
        'https://i.ibb.co/x8MQbTs9/C2.jpg',
        'https://i.ibb.co/nsdyKXbC/C1.jpg',
        'https://i.ibb.co/dsXdZKtZ/C3.jpg',
      ] 
    },
    { 
      title: t.shacmanTrucks, 
      description: t.shacmanTrucks_desc, 
      imageUrls: [
        'https://i.ibb.co/8gFXWB00/S1.png',
        'https://i.ibb.co/8DpZp8HX/S2.jpg',
        'https://i.ibb.co/k2MzRG6M/S3.png',
      ] 
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.title}</h2>
        <p className="text-zinc-400 text-lg">{t.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
