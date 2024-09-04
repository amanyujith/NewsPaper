import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topArticle } from "../store/topSlice";
import { RootState } from "../store/store";
import { Ellipsis } from "lucide-react";
// interface TopTypes{
//     author:string
//     title:string
//     url:string
//     content:null
//     description:null
//     urlToImage:null
//     publishedAt:Date
//     source:
// {id:string, name:string}
// }
const TopArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.topArticles.article);
  const language = useSelector((state: RootState) => state.api.language);
  // const [articles,setArticles] = useState([])
  useEffect(() => {
    console.log("s1");

    const Articles = async () => {
      console.log("s2");

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&language=${language}apiKey=12091f9a14bc41819638c4932e4a536f`
        );
        // setArticles(response.data.articles);
        dispatch(topArticle(response.data.articles));
        console.log(response, "rrrr");
      } catch (err) {
        console.log("Something wnet wrong", err);
      }
    };
    Articles();
  }, []);
  // console.log(top,'2222222222');

  return (
    <div className="">
      <div className="flex flex-col  bg-slate-100 p-2 rounded-lg ml-2 mt-6">
        <div className="flex justify-center rounded-lg ">
          <Ellipsis color="black" />
          <h1 className="flex justify-center text-gray-950 font-bold">
            Editor's Pick
          </h1>
        </div>
        <div className="bg-white flex flex-row  sm:flex-col rounded-lg  max-h-[430px] overflow-x-auto sm:overflow-y-auto">
          {articles &&
            articles.map((article) => {
              return (
                <div className=" sm:border-x-0 sm:mt-2 mr-2  hover:bg-slate-100 p-2 rounded-lg min-w-fit">
                  <a href={article.url} className="font-serif">
                    {article.title}
                  </a>
                </div>
              );
            })}
          {/* <p className="text-sm">{top.title}</p> */}
          {/* <a href={top.url} className="">{top.title}</a> */}
        </div>
      </div>
    </div>
  );
};
export default TopArticles;
