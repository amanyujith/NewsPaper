import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewsFeed from "./NewsFeed";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { RootState } from "../store/store";
import TopArticles from "./TopArticles";
import Carousel from "./Carousel";
import ScrollToTop from "./ScrollToTop";
import { InfinitySpin } from "react-loader-spinner";
const Home = () => {
  const [articles, setArticles] = useState([]);
  // const [topArticles , setTopArticles] = useState([]);
  const apiEndPoints = useSelector(
    (state: RootState) => state.api.apiEndPoints
  );
  const [isLoading, setIsLoading] = useState(false);
  const language = useSelector((state: RootState) => state.api.language);
  const sort = useSelector((state: RootState) => state.api.sortBy);
  const apiKey = "46b9fd0e42f145a991f66b0d67257abf";

  console.log("sorttttt", sort);

  useEffect(() => {
    setIsLoading(true);
    const getArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/${apiEndPoints}&language=${language}&sortBy=${sort}&apiKey=${apiKey}`
        );
        setArticles(response.data.articles);
        console.log(response);
        console.log("asds", response.data.articles);
        setIsLoading(false);

        // const topResponse = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=12091f9a14bc41819638c4932e4a536f');
        // setTopArticles(topResponse.data.articles);
      } catch (error) {
        console.log("Something Went Wrong", error);
      }
    };
    getArticles();
  }, [apiEndPoints, language, sort]);

  return (
    <div className="bg-white mt-0 flex flex-col">
      <TopBar />
      <NavBar />

      <div className="flex flex-col w-full  sm:flex-row">
        <div className="flex-grow  sm:w-3/12 order-2 sm:order-1">
          <TopArticles />
        </div>

        <div className="flex-row sm:w-5/12 justify-center p-3 mt-3 max-h-[480px] overflow-y-auto order-3 sm:order-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <InfinitySpin
                // visible={true}
                width="200"
                color="#4fa94d"
                // ariaLabel="infinity-spin-loading"
              />
            </div>
          ) : (
            <div>
              {articles.map((article) => (
                <NewsFeed article={article} />
              ))}
              <ScrollToTop />
            </div>
          )}
        </div>

        <div className="sm:w-4/12 order-1 sm:order-3">
          <Carousel />
        </div>
      </div>
    </div>
  );
};
export default Home;
