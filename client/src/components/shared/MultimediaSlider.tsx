import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { type UseEmblaCarouselType } from "embla-carousel-react";

// Import the stock images
import quarryImage1 from "@assets/stock_images/luxury_marble_quarry_47d5f286.jpg";
import quarryImage2 from "@assets/stock_images/luxury_marble_quarry_a2778dc2.jpg";
import quarryImage3 from "@assets/stock_images/luxury_marble_quarry_3eed1987.jpg";
import craftingImage1 from "@assets/stock_images/marble_crafting_arti_fc463294.jpg";
import craftingImage2 from "@assets/stock_images/marble_crafting_arti_1bb807ef.jpg";
import craftingImage3 from "@assets/stock_images/marble_crafting_arti_dc7e7a4b.jpg";
import interiorImage1 from "@assets/stock_images/luxury_marble_interi_f556820e.jpg";
import interiorImage2 from "@assets/stock_images/luxury_marble_interi_0961cb81.jpg";
import interiorImage3 from "@assets/stock_images/luxury_marble_interi_01a481b8.jpg";

export interface SlideContent {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  subtitle: string;
  description?: string;
  poster?: string; // For videos
}

interface MultimediaSliderProps {
  slides?: SlideContent[];
  autoplayDelay?: number;
  className?: string;
  children?: React.ReactNode;
}

// Sample marble industry content
export const marbleIndustrySlides: SlideContent[] = [
  {
    id: "quarry-operations",
    type: "image",
    src: quarryImage1,
    title: "Premium Marble Extraction",
    subtitle: "From Quarry to Creation",
    description: "Our skilled craftsmen carefully extract the finest marble from our exclusive quarries in Morocco, ensuring the highest quality materials for your luxury projects."
  },
  {
    id: "marble-crafting",
    type: "image", 
    src: craftingImage1,
    title: "Artisan Excellence",
    subtitle: "Master Craftsmanship",
    description: "With over 20 years of experience, our master artisans transform raw marble into stunning architectural elements using traditional techniques and modern precision."
  },
  {
    id: "luxury-interior",
    type: "image",
    src: interiorImage1,
    title: "Elegant Installations",
    subtitle: "Transforming Spaces",
    description: "From luxury hotels to prestigious residences, our marble installations create breathtaking environments that epitomize sophistication and timeless beauty."
  },
  {
    id: "marble-showroom",
    type: "video",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: interiorImage2,
    title: "Virtual Showroom Tour",
    subtitle: "Experience Our Collections",
    description: "Take a virtual journey through our extensive marble collections and see how our premium materials can transform your next project."
  },
  {
    id: "installation-process",
    type: "video", 
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: craftingImage2,
    title: "Professional Installation",
    subtitle: "Precision in Every Detail",
    description: "Watch our expert installation team bring marble visions to life with meticulous attention to detail and uncompromising quality standards."
  },
  {
    id: "finished-projects",
    type: "image",
    src: interiorImage3,
    title: "Completed Masterpieces",
    subtitle: "Legacy of Excellence", 
    description: "Discover our portfolio of completed projects that showcase the transformative power of premium marble in creating extraordinary spaces."
  }
];

const MultimediaSlider = ({ 
  slides = marbleIndustrySlides, 
  autoplayDelay = 5000, 
  className = "",
  children
}: MultimediaSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [api, setApi] = useState<UseEmblaCarouselType[1]>();
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const autoplayTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
      
      // Pause all videos when changing slides
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
        }
      });
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Custom autoplay implementation
  useEffect(() => {
    if (!api || !isPlaying) {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
      return;
    }

    autoplayTimer.current = setInterval(() => {
      api.scrollNext();
    }, autoplayDelay);

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [api, isPlaying, autoplayDelay]);

  const handleSlideClick = (index: number) => {
    api?.scrollTo(index);
  };

  const handleVideoRef = (slideId: string, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current[slideId] = element;
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className={`relative h-screen overflow-hidden ${className}`}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      data-testid="multimedia-slider"
    >
      {/* Carousel */}
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="h-full"
        data-testid="carousel-container"
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full relative">
              <div className="relative h-full w-full">
                {slide.type === "image" ? (
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                    data-testid={`image-slide-${index}`}
                  />
                ) : (
                  <video
                    ref={(el) => handleVideoRef(slide.id, el)}
                    src={slide.src}
                    poster={slide.poster}
                    className="h-full w-full object-cover"
                    muted
                    loop
                    preload="metadata"
                    data-testid={`video-slide-${index}`}
                  />
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-dark/70 via-blue-dark/40 to-transparent"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows - only visible on hover */}
        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <CarouselPrevious 
            className="static translate-y-0 bg-white/20 border-white/30 hover:bg-white/30 text-white h-12 w-12"
            data-testid="button-previous"
          />
          <CarouselNext 
            className="static translate-y-0 bg-white/20 border-white/30 hover:bg-white/30 text-white h-12 w-12"
            data-testid="button-next"
          />
        </div>
      </Carousel>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 bg-gold text-white text-sm rounded-full font-medium">
                  {currentSlideData?.subtitle}
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6"
                data-testid="slide-title"
              >
                {currentSlideData?.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                data-testid="slide-description"
              >
                {currentSlideData?.description}
              </motion.p>
              
              {children && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8"
                >
                  {children}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleSlideClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gold scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`indicator-${index}`}
            />
          ))}
        </div>
      </div>

      {/* Play/Pause control */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-8 right-8 bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm z-20"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        data-testid="button-play-pause"
      >
        <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"} text-sm`}></i>
      </button>

      {/* Video indicator for video slides */}
      {currentSlideData?.type === "video" && (
        <div className="absolute top-8 right-8 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
          <i className="fas fa-play-circle mr-2"></i>
          VIDEO
        </div>
      )}
    </div>
  );
};

export default MultimediaSlider;