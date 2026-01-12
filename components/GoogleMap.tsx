import React from 'react';

// Simple Map Pin Icon
const MapPinIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface GoogleMapProps {
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.237875570661!2d-0.5951550000000001!3d35.72036790000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e63001d363b7b%3A0x73703e7df5c92b13!2sMAGIC%20EQUIPEMENT!5e0!3m2!1sen!2sdz!4v1767983518153!5m2!1sen!2sdz"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Magic Equipment Location Map"
      />
    </div>
  );
};

interface LocationSectionProps {
  language: 'en' | 'fr' | 'ar';
}

export const LocationSection: React.FC<LocationSectionProps> = ({ language }) => {
  const content = {
    en: {
      title: 'Find Us',
      address: 'Magic Equipment',
      description: 'Visit our office in Oran, Algeria',
      phone: 'Call us for more information'
    },
    fr: {
      title: 'Nous Trouver',
      address: 'Magic Equipment',
      description: 'Visitez notre bureau à Oran, Algérie',
      phone: 'Appelez-nous pour plus d\'informations'
    },
    ar: {
      title: 'جدنا',
      address: 'Magic Equipment',
      description: 'زيارة مكتبنا في وهران، الجزائر',
      phone: 'اتصل بنا للمزيد من المعلومات'
    }
  };

  const current = content[language];

  return (
    <section className="py-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <MapPinIcon className="w-8 h-8 text-gray-400" />
            {current.title}
          </h2>
          <p className="text-xl text-gray-300 mb-2 font-semibold">{current.address}</p>
          <p className="text-zinc-400">{current.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-700">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">
                {language === 'en' ? 'Location & Hours' : language === 'fr' ? 'Localisation & Heures' : 'الموقع والساعات'}
              </h3>
              <p className="text-zinc-300 mb-4">
                {language === 'en' 
                  ? 'Magic Equipment is located in Oran, Algeria. We serve clients throughout Mascara, Oran, and surrounding regions.'
                  : language === 'fr'
                  ? 'Magic Equipment est situé à Oran, en Algérie. Nous servons les clients dans tout Mascara, Oran et les régions environnantes.'
                  : 'تقع Magic Equipment في وهران، الجزائر. نخدم العملاء في جميع أنحاء معسكر ووهران والمناطق المحيطة.'}
              </p>
            </div>

            <div className="bg-gray-800/20 p-6 rounded-lg border border-gray-700/30">
              <p className="text-zinc-200">
                {language === 'en' 
                  ? 'Contact us for equipment rental, real estate opportunities, or construction services.'
                  : language === 'fr'
                  ? 'Contactez-nous pour la location d\'équipement, les opportunités immobilières ou les services de construction.'
                  : 'تواصل معنا لتأجير المعدات أو الفرص العقارية أو خدمات البناء.'}
              </p>
            </div>
          </div>

          <div>
            <GoogleMap />
          </div>
        </div>
      </div>
    </section>
  );
};
