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
const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.carousel.articles);
  // const [articles,setArticles] = useState([])
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
        console.log(response, "rrrr");
      } catch (err) {
        console.log("Something wnet wrong", err);
      }
    };
    Articles();
  }, [language, sort]);
  // console.log(top,'2222222222');

  return (
    <div className=" mt-5 ">
      <div className="flex flex-col  bg-slate-100">
        <div className="bg-white">
          <div className="embla bg-neutral-100 p-2 rounded-lg mt-1 mr-2 ">
            <div className="embla__viewport mb-1" ref={emblaRef}>
              <div className="embla__container ">
                {articles &&
                  articles.map((article, index) => (
                    <div
                      className="embla__slide bg-neutral-200 rounded-lg"
                      key={index}
                    >
                      <div className="">
                        <img
                          src={article.urlToImage || paper}
                          onError={(e)=> {const img = e.target as HTMLImageElement; img.src=paper} }
                          alt={article.title}
                          className=" h-48 min-w-full rounded-t-lg"
                        />
                      </div>
                      <a
                        href={article.url}
                        className="hover:underline hover:text-neutral-700"
                      >
                        {" "}
                        <h1 className="px-4">{article.title}</h1>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
            <Button
              value={<ChevronLeft />}
              onClick={scrollPrev}
              cl="hover:bg-gray-200 max-w-fit"
            />
            <Button
              value={<ChevronRight />}
              onClick={scrollNext}
              cl="hover:bg-gray-200 max-w-fit"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 bg-slate-100 flex justify-between h-20 rounded-lg mr-2  p-2">
        <h1>hhhhhh</h1>
        <div>
          {/* <h1>Feedback</h1> */}
          <FeedBack />
        </div>
      </div>
    </div>
  );
};
export default Carousel;

// import React from 'react'
// import useEmblaCarousel from 'embla-carousel-react'

// export default function EmblaCarousel() {
//   const [emblaRef] = useEmblaCarousel()

//   return (

//     <div className="embla" ref={emblaRef}>
//       <div className="embla__container">
//         <div className="embla__slide">Slide 1</div>
//         <div className="embla__slide">Slide 2</div>
//         <div className="embla__slide">Slide 3</div>
//       </div>
//     </div>
//   )
// }
