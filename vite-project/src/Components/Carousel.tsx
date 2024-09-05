import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CarouselArticle } from "../store/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Button from "../Utilities/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import paper from "../assets/paper.jpeg";
import FeedBack from "./FeedBack";
import { EmblaCarousel } from "./Ads";
const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000,stopOnInteraction: false }),
  ]);
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.carousel.articles);
  const language = useSelector((state: RootState) => state.api.language);
  const sort = useSelector((state: RootState) => state.api.sortBy);
  const apiKey = "46b9fd0e42f145a991f66b0d67257abf";
 

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    console.log("s1");

    const Articles = async () => {
      console.log("s2");
     
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=entertainment&language=${language}&sortBy=${sort}&apiKey=${apiKey}`
        );
      
        // setArticles(response.data.articles);
        const articles = response.data.articles.slice(1);
        dispatch(CarouselArticle(articles));
        // console.log(response, "rrrr");
      } catch (err) {
        console.log("Something wnet wrong", err);
      }
    };
    
    Articles();
  }, [language, sort]);
  // console.log(top,'2222222222');

  return (
    <div className=" mt-5 border-l-2">
      <div className="flex flex-col  ">
        <div className="bg-white">
          <div className="embla  p-2 rounded-lg mt-1 mr-2 ">
            <div className="embla__viewport  max-h-fit" ref={emblaRef}>
              <div className="embla__container ">
                {articles &&
                  articles.map((article, index) => (
                    <div
                      className="embla__slide  rounded-lg  max-h-72"
                      key={index}
                    >
                      <div className="">
                        <img
                          src={article.urlToImage || paper}
                          onError={(e)=> {const img = e.target as HTMLImageElement; img.src=paper} }
                          alt={article.title}
                          className=" h-48 min-w-full rounded-t-lg "
                        
                        />
                        
                      </div>
                      <a 
                        href={article.url}
                        className="hover:underline hover:text-neutral-700"
                      >
                        {" "}
                        <h1 className="px-4 font-serif pt-2 border-b-2 rounded-lg ">{article.title}</h1>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
            <div className="pl-2 ">
            <Button
              value={<ChevronLeft />}
              onClick={scrollPrev}
              cl="hover:bg-gray-200 max-w-fit "
            />
            <Button
              value={<ChevronRight />}
              onClick={scrollNext}
              cl="hover:bg-gray-200 max-w-fit"
            />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-2 justify-between  h-32 rounded-lg mr-2  p-2 flex flex-col ">
       <EmblaCarousel/>
        <div className="flex justify-end gap-3 border-b-2 rounded-lg">
          <h1 className="mb-2 mt-1">Provide Us A Feedback </h1>
          <div className="mt-1 mr-1">
          <FeedBack />
          </div>
        </div>
      </div>
    
    </div>
  );
};
export default Carousel;


