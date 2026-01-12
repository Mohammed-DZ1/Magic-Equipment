import React from 'react';

interface AboutProps {
  t: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
  };
}

const About: React.FC<AboutProps> = ({ t }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <div className="perspective-container order-2 lg:order-1">
          <img 
            src="https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Modern heavy equipment" 
            className="rounded-lg shadow-2xl shadow-black/20 card-3d h-full w-full object-cover min-h-64 lg:min-h-auto"
          />
        </div>
        <div className="perspective-container order-1 lg:order-2">
          <div className="card-3d bg-zinc-800/50 p-6 sm:p-8 rounded-lg shadow-lg h-full flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">{t.title}</h2>
            <p className="text-zinc-400 mb-4 text-sm sm:text-base lg:text-lg leading-relaxed">
              {t.p1}
            </p>
            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg mb-4 leading-relaxed">
              {t.p2}
            </p>
            <p className="text-gray-400 font-semibold text-sm sm:text-base lg:text-lg leading-relaxed">
              {t.p3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;