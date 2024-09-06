import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import spotify from "../assets/spotify.png";
import linkedin from "../assets/linkedin.png";
import amazon1 from '../assets/amazon4.png'
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
            <img src={spotify} alt="Spotify" className="w-full h-20 object-cover" onClick={()=>window.location.href='https://open.spotify.com/'}/>
          </div>
          <div className="embla__slide">
            <img src={linkedin} alt="LinkedIn" className="w-full h-20 object-cover" onClick={()=>window.location.href='https://in.linkedin.com/'}/>
          </div>
          <div className="embla__slide">
            <img
              src={amazon1}
              alt="car"
              className="w-full h-20 object-cover"
              onClick={()=>window.location.href='https://www.amazon.in/'}
            />
          </div>
        </div>
      </div>

    
    </div>
  );
}
