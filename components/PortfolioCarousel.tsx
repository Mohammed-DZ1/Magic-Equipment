import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface PortfolioCarouselProps {
  items: PortfolioItem[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({ 
  items, 
  autoRotate = true,
  autoRotateInterval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, autoRotateInterval, items.length]);

  // Pause auto-rotation on hover
  useEffect(() => {
    if (!autoRotate || !isHovering) return;
    return () => {};
  }, [autoRotate, isHovering]);

  const currentItem = items[currentIndex];

  // Calculate rotation angle for each image in the carousel
  const getRotation = (index: number) => {
    const anglePerItem = 360 / items.length;
    const itemAngle = anglePerItem * index;
    const rotationOffset = anglePerItem * currentIndex;
    return itemAngle - rotationOffset;
  };

  const radius = 500; // Larger radius for circular gallery
  const verticalRadius = 200; // Vertical depth for 3D effect
  const itemCount = items.length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* 3D Carousel Container */}
      <div 
        className="relative h-[580px] rounded-lg overflow-hidden shadow-2xl shadow-black/50 bg-black flex items-center justify-center"
        style={{
          perspective: '1500px',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-black/80 pointer-events-none z-10"></div>

        {/* 3D Carousel Items Container */}
        <div 
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, index) => {
            const angle = (360 / itemCount) * index;
            const isCenter = index === currentIndex;
            const angleOffset = (360 / itemCount) * currentIndex;
            const itemAngle = angle - angleOffset;

            // Calculate position on cylinder
            const radians = (itemAngle * Math.PI) / 180;
            const x = Math.sin(radians) * radius;
            const z = Math.cos(radians) * radius - 150;

            // Calculate scale and opacity based on position
            const distance = Math.abs(itemAngle);
            const normalizedDistance = Math.min(distance, 180);
            const scale = 0.35 + (1 - normalizedDistance / 180) * 0.65;
            const opacity = 0.15 + (1 - normalizedDistance / 180) * 0.85;
            
            // Rotation for cylindrical effect - faces outward
            const rotationY = itemAngle;
            
            // Skew for curved warping effect
            const skewY = Math.sin(radians) * 12;
            const skewX = Math.cos(radians) * -8;
            
            // Perspective tilt
            const perspectiveX = Math.sin(radians) * 25;

            return (
              <div
                key={item.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className={`absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer ${
                    isCenter ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    width: `${240 * scale}px`,
                    height: `${135 * scale}px`,
                    transform: `
                      translateX(${x}px) 
                      translateZ(${z}px) 
                      rotateY(${rotationY}deg) 
                      rotateX(${perspectiveX}deg) 
                      skewY(${skewY}deg) 
                      skewX(${skewX}deg)
                      scale(${scale})
                    `,
                    opacity: opacity,
                    transformStyle: 'preserve-3d',
                    boxShadow: `
                      ${Math.sin(radians) * 40}px 
                      ${Math.cos(radians) * 20}px 
                      60px 
                      rgba(0, 0, 0, ${0.6 + normalizedDistance / 180 * 0.3}),
                      inset -3px -3px 12px rgba(0, 0, 0, 0.7),
                      inset 2px 2px 8px rgba(255, 255, 255, ${0.1 * (1 - normalizedDistance / 180)})
                    `,
                  }}
                  onClick={() => goToSlide(index)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Enhanced shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/40 pointer-events-none"></div>
                  {/* Top curved edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-white/50 to-transparent pointer-events-none rounded-t-2xl"></div>
                  {/* Side edge for curved effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-white/30 via-white/10 to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-orange-500/80 hover:bg-orange-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-orange-500/80 hover:bg-orange-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </div>

      {/* Info Section Below Carousel */}
      <div className="mt-8 bg-gradient-to-r from-zinc-900/50 to-black/50 rounded-lg p-6 sm:p-8 border border-zinc-700/30">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase">
                Project {currentIndex + 1} / {items.length}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              {currentItem.title}
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {currentItem.description}
            </p>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-700/30">
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-orange-500 w-8 h-3'
                    : 'bg-zinc-600 hover:bg-zinc-500 w-3 h-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
          <span className="text-zinc-400 text-xs ml-auto">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;
