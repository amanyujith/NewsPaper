import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from "../store/newsSlice";
import { likeArticle, disLikeArticle } from "../store/likesSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "../store/store";
import Button from "../Utilities/Button";
import paper from "../assets/paper.jpeg";
import { createSelector } from "reselect";
// import axios from 'axios';
const selectUserArticles = (state: RootState, userId: string) =>
  state.savedArticles.articles.find((entry) => entry.user === userId);

const selectSavedArticles = createSelector(
  [selectUserArticles],
  (userArticles) => (userArticles ? userArticles.saved : [])
);

const selectLikedArticles = createSelector(
  [(state: RootState) => state.likedArticles.articles, (_, userId: string) => userId],
  (articles, userId) =>
    articles.find((entry) => entry.user === userId)?.liked || []
);

const selectDislikedArticles = createSelector(
  [(state: RootState) => state.likedArticles.articles, (_, userId: string) => userId],
  (articles, userId) =>
    articles.find((entry) => entry.user === userId)?.disliked || []
);
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

  const { user, isAuthenticated } = useAuth0();
  const [save, setSave] = useState("SAVE");
  const dispatch = useDispatch();
  const userId = user?.email||'';
  const savedArticles = useSelector((state: RootState) =>
    selectSavedArticles(state, userId)
  );
  const LikedArticles = useSelector((state: RootState) =>
    selectLikedArticles(state, userId)
  );
  const DislikedArticles = useSelector((state: RootState) =>
    selectDislikedArticles(state, userId)
  );
  // const savedArticles = useSelector((state: RootState) => {
  //   const userArticles = state.savedArticles.articles.find(
  //     (entry) => entry.user === userId
  //   );
  //   return userArticles ? userArticles.saved : [];
  // });
  // const LikedArticles = useSelector((state: RootState) => {
  //   const userArticles = state.likedArticles.articles.find(
  //     (entry) => entry.user === userId
  //   );
  //   return userArticles ? userArticles.liked : [];
  // });
  // const DislikedArticles = useSelector((state: RootState) => {
  //   const userArticles = state.likedArticles.articles.find(
  //     (entry) => entry.user === userId
  //   );
  //   return userArticles ? userArticles.disliked : [];
  // });
  const [likeSelected, setLikeSelected] = useState(false);
  const [dislikeSelected, setDislikeSelected] = useState(false);
  useEffect(() => {
    if (savedArticles) {
      ArticleStatusChecker();
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

  );
};

export default NewsFeed;
