import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight } from 'lucide-react';

// Images
import hotelImg from '../assets/welcomePageHotelImage.jpg';
import weddingImg from '../assets/welcomePageWeddingIamge.jpg';
import taxiImg from '../assets/taxi_straight.png';

const slides = [
  {
    id: 1,
    title: "Luxurious Stays",
    subtitle: "Hotel Services",
    description: "Indulge in a premium stay at curated locations with world-class amenities.",
    image: hotelImg,
    path: "/hotel",
    theme: "from-blue-600/20 to-transparent",
    btnColor: "bg-sky-200 hover:bg-sky-300 text-sky-950"
  },
  {
    id: 2,
    title: "Destination Wedding",
    subtitle: "Wedding Dreams",
    description: "Craft your dream celebration with elegance and breathtaking views.",
    image: weddingImg,
    path: "/wedding",
    theme: "from-rose-600/20 to-transparent",
    btnColor: "bg-pink-100 hover:bg-pink-200 text-pink-950"
  },
  {
    id: 3,
    title: "Taxi Service",
    subtitle: "Taxi Service",
    description: "Travel in comfort with our elite fleet of premium vehicles.",
    image: taxiImg,
    path: "/taxi",
    theme: "from-amber-600/20 to-transparent",
    btnColor: "bg-yellow-100 hover:bg-yellow-200 text-yellow-950"
  }
];

const Welcome = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    const timer = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div style={{ height: '100dvh' }} className="fixed inset-0 w-full bg-[#1e1b1b] overflow-hidden font-['Inter',sans-serif]">
      {/* Carousel Container */}
      <div style={{ height: '100dvh' }} className="w-full overflow-hidden" ref={emblaRef}>
        <div style={{ height: '100dvh' }} className="flex w-full">
          {slides.map((slide, index) => (
            <div key={slide.id} style={{ height: '100dvh' }} className="relative flex-[0_0_100%] min-w-0">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  className={`transition-transform duration-[4000ms] ease-out ${selectedIndex === index ? 'scale-110' : 'scale-100'}`}
                />
              </div>

              {/* Enhanced Gradient Overlays */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.theme} opacity-40 mix-blend-overlay z-0`} />

              {/* Content Area - Bottom Anchored */}
              <div className="absolute bottom-4 left-0 right-0 p-8 md:p-12 z-20 flex flex-col items-start gap-3">
                <div className="overflow-hidden">
                  <span className={`inline-block text-xs font-black tracking-[0.3em] uppercase text-white/70 py-1 transition-all duration-700 delay-300 transform ${selectedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    {slide.subtitle}
                  </span>
                </div>
                
                <h1 className={`text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-2 transition-all duration-1000 delay-500 transform ${selectedIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                  {slide.title}
                </h1>
                
                <p className={`text-sm md:text-lg text-white/80 max-w-[90%] md:max-w-md font-medium leading-relaxed mb-6 transition-all duration-1000 delay-700 transform ${selectedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  {slide.description}
                </p>

                <button
                  onClick={() => navigate(slide.path)}
                  className={`group flex items-center gap-3 px-7 py-4 rounded-full font-black text-sm tracking-tight transition-all duration-300 delay-[900ms] transform ${slide.btnColor} ${selectedIndex === index ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`}
                >
                  Explore Now
                  <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow - Navigate to Next Slide */}
      <button
        onClick={() => emblaApi && emblaApi.scrollNext()}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>


    </div>
  );
};

export default Welcome;
