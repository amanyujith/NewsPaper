import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from "../store/newsSlice";
import { likeArticle, disLikeArticle } from "../store/likesSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "../store/store";
import Button from "../Utilities/Button";
import paper from "../assets/paper.jpeg";
// import axios from 'axios';
type NewsFeedProps = {
  title: string;
  url: string;
  author: string;
  content: string;
  description: string;
  publishedAt: Date;
  urlToImage: string;
};
interface ArtcleProps {
  article: NewsFeedProps;
}
const NewsFeed = ({ article }: ArtcleProps) => {
  // console.log(article);

  const { user, isAuthenticated } = useAuth0();
  const [save, setSave] = useState("SAVE");
  // const [topArticles , setTopArticles] = useState([]);
  const dispatch = useDispatch();
  const userId = user?.email;
  const savedArticles = useSelector((state: RootState) => {
    const userArticles = state.savedArticles.articles.find(
      (entry) => entry.user === userId
    );
    return userArticles ? userArticles.saved : [];
  });
  const LikedArticles = useSelector((state: RootState) => {
    const userArticles = state.likedArticles.articles.find(
      (entry) => entry.user === userId
    );
    return userArticles ? userArticles.liked : [];
  });
  const DislikedArticles = useSelector((state: RootState) => {
    const userArticles = state.likedArticles.articles.find(
      (entry) => entry.user === userId
    );
    return userArticles ? userArticles.disliked : [];
  });
  const [likeSelected, setLikeSelected] = useState(false);
  const [dislikeSelected, setDislikeSelected] = useState(false);
  // console.log("svddd",savedArticles);

  useEffect(() => {
    // const getArticles = async ()=>{
    //   try{
    //     const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=4adee072bbd84929a2f06d0ea3922968');
    //       setTopArticles(response.data.articles);
    //   }
    //   catch(err){
    //     console.log("Something Went Wrong",err);

    //   }
    // }
    // getArticles();
    if (savedArticles) {
      ArticleStatusChecker();
      // savedChecker();
      // LikedChecker();
      // DisLikedChecker();
    }
  }, [savedArticles]);
  const ArticleStatusChecker = () => {
    const isSaved = savedArticles.some((item) => item.url === article.url);
    const isLiked = LikedArticles.some((item) => item.url === article.url);
    const isDisliked = DislikedArticles.some(
      (item) => item.url === article.url
    );

    if (isSaved) setSave("SAVED");
    if (isLiked) setLikeSelected(true);
    if (isDisliked) setDislikeSelected(true);
  };
  //   const savedChecker = () =>{
  //     savedArticles.map((items)=>{
  //         if(article.url === items.url){
  //             setSave('SAVED')
  //         }
  //     })
  //   }
  // const LikedChecker = ()=>{
  //     LikedArticles.map((item)=>{
  //         if(article.url === item.url){
  //             setLikeSelected(true)
  //         }
  //     })
  // }
  // const DisLikedChecker = ()=>{
  //     DislikedArticles.map((items)=>{
  //         if(article.url===items.url){
  //             setDislikeSelected(true);
  //         }
  //     })
  // }

  const handleSave = () => {
    console.log(typeof article, "arrrr");

    if (isAuthenticated) {
      if (user?.email) {
        dispatch(addArticle({ user: user?.email, article: article }));
      }
      setSave("SAVED");
    }
  };

  const handleLikeClick = () => {
    if (isAuthenticated) {
      dispatch(likeArticle({ user: user?.email, article: article }));
      setLikeSelected(!likeSelected);
      if (dislikeSelected) {
        setDislikeSelected(false);
      }
    }
  };

  const handleDislikeClick = () => {
    if (isAuthenticated) {
      dispatch(disLikeArticle({ user: user?.email, article: article }));
      setDislikeSelected(!dislikeSelected);
      if (likeSelected) {
        setLikeSelected(false);
      }
    }
  };

  return (
    <div className=" flex  ">
      {/* <div className='   '> */}
      <div className="border-2 rounded-lg bg-slate-100 p-3 auto">
        {/* <div className='bg-slate-200 p-3 rounded-lg'> */}
        <h1 className="font-mono font-bold ">{article.title}</h1>
        <div className="w-fit  flex ">
          <img src={article.urlToImage || paper} alt="" />
        </div>
        <p className="text-black font-mono">{article.description}</p>
        {/* </div> */}
        <div className="flex justify-between p-2 items-center">
          <a href={article.url} className="underline hover:text-blue-400">
            Read More
          </a>
          <div className="flex ">
            <Button
              value={save}
              onClick={handleSave}
              cl="hover:bg-white mr-2"
            />
            <div className="flex gap-3">
              <button
                onClick={handleLikeClick}
                className={`text-2xl ${
                  likeSelected ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <FaThumbsUp />
              </button>
              <button
                onClick={handleDislikeClick}
                className={`text-2xl ${
                  dislikeSelected ? "text-red-500" : "text-gray-400"
                }`}
              >
                <FaThumbsDown />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* </div> */}
    </div>

    //     <div className="max-w-full bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-4 p-6">
    //   <div className="sm:flex ">
    //     <img src={article.urlToImage} alt="News" className="sm:w-1/3 h-48 object-contain mb-4" />
    //     <div className="ml-6 flex flex-col justify-center">
    //       <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
    //       <p className="text-gray-600 mt-2">{article.description}</p>
    //     </div>
    //   </div>
    //   <p className="text-gray-600 mt-4">{article.content}</p>
    //   <div className="flex justify-between items-center mt-4">
    //     <p className="text-sm text-gray-500">{article.author}</p>
    //     <a href={article.url} className='underline hover:text-blue-500'>Read More</a>
    //     <div className="flex space-x-4">
    //       <button onClick={handleSave}>
    //         {save}
    //       </button>
    //       <button
    //         onClick={handleLikeClick}
    //         className={`text-2xl ${likeSelected ? 'text-blue-500' : 'text-gray-400'}`}
    //       >
    //         <FaThumbsUp />
    //       </button>
    //       <button
    //         onClick={handleDislikeClick}
    //         className={`text-2xl ${dislikeSelected ? 'text-red-500' : 'text-gray-400'}`}
    //       >
    //         <FaThumbsDown />
    //       </button>
    //     </div>
    //   </div>

    //   <ScrollToTop />
    // </div>
  );
};

export default NewsFeed;
