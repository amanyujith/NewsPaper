import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import spotify from "../assets/spotify.png";
import linkedin from "../assets/linkedin.png";
import car from '../assets/car.jpeg'
import amazon1 from '../assets/amazon4.png'
import pubg from '../assets/pubg.jpeg'
export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }), 
  ]);

  return (
    <div className="embla ">
      {/* Embla Carousel with Images */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <img src={spotify} alt="Spotify" className="w-full h-20 object-cover" />
          </div>
          <div className="embla__slide">
            <img src={linkedin} alt="LinkedIn" className="w-full h-20 object-cover" />
          </div>
          <div className="embla__slide">
            <img
              src={amazon1}
              alt="car"
              className="w-full h-20 object-cover"
            />
          </div>
        </div>
      </div>

    
    </div>
  );
}
