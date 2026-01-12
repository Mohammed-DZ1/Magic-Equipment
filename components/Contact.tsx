import React from 'react';
import { PhoneIcon, MailIcon, WhatsAppIcon } from './icons';

interface ContactProps {
  t: {
    title: string;
    description: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
}

const ContactInfo: React.FC<{ icon: React.ReactNode; title: string; value: string; href: string }> = ({ icon, title, value, href }) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto');
  const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} {...linkProps} className="flex items-start p-4 sm:p-6 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors duration-300">
      <div className="flex-shrink-0 text-gray-400">
        {icon}
      </div>
      <div className="ml-3 sm:ml-4 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
        <p className="text-zinc-300 break-words text-sm sm:text-base">{value}</p>
      </div>
    </a>
  );
};

const Contact: React.FC<ContactProps> = ({ t }) => {
  const contacts = [
    { icon: <PhoneIcon className="w-8 h-8"/>, title: t.phone, value: '+213-541-725-080', href: 'tel:+213541725080' },
    { icon: <MailIcon className="w-8 h-8"/>, title: t.email, value: 'magicequipment.contact@gmail.com', href: 'mailto:magicequipment.contact@gmail.com' },
    { icon: <WhatsAppIcon className="w-8 h-8"/>, title: t.whatsapp, value: 'Start Chat', href: 'https://wa.me/213541725080' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">{t.title}</h2>
        <p className="text-zinc-400 text-sm sm:text-base lg:text-lg">{t.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
        {contacts.map((contact, index) => (
          <ContactInfo key={index} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default Contact;