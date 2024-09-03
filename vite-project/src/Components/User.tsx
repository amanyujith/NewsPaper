import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAuth0 } from "@auth0/auth0-react";
import { addArticle, removeArticle } from "../store/newsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import paper from "../assets/paper.jpeg";
import {
  RemoveLike,
  RemoveDislike,
  likeArticle,
  disLikeArticle,
} from "../store/likesSlice";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import { MenuIcon } from "lucide-react";
import Button from "../Utilities/Button";
import ScrollToTop from "./ScrollToTop";
type NewsFeedProps = {
  title: string;
  url: string;
  author: string;
  content: string;
  description: string;
  publishedAt?: Date;
  urlToImage: string;
};

const User = () => {
  const { user, isAuthenticated } = useAuth0();
  const userId = user?.email;
  const [title, SetTitle] = useState("Saved");
  const dispatch = useDispatch();
  const [isOPen, setIsOpen] = useState(false);
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

  const [view, setView] = useState("saved");

  const handleSave = (article: NewsFeedProps) => {
    if (isAuthenticated) {
      if (user?.email) {
        dispatch(addArticle({ user: user?.email, article: article }));
      }
    }
  };

  const handleRemove = (url: string) => {
    if (isAuthenticated) {
      if (view === "saved") {
        dispatch(removeArticle({ user: user?.email, url: url }));
      } else if (view === "liked") {
        dispatch(RemoveLike({ user: user?.email, url: url }));
      } else if (view === "disliked") {
        dispatch(RemoveDislike({ user: user?.email, url: url }));
      }
    }
  };

  const handleLikeClick = (article: any) => {
    if (isAuthenticated) {
      dispatch(likeArticle({ user: user?.email, article: article }));
    }
  };

  const handleDislikeClick = (article: any) => {
    if (isAuthenticated) {
      dispatch(disLikeArticle({ user: user?.email, article: article }));
    }
  };
  useEffect(() => {
    if (view === "saved") {
      SetTitle("Saved");
    } else if (view === "liked") {
      SetTitle("Liked");
    } else if (view === "disliked") {
      SetTitle("Disliked");
    }
  }, [view]);
  const renderArticle = () => {
    switch (view) {
      case "saved":
        return [...savedArticles].reverse();
      case "liked":
        return [...LikedArticles].reverse();
      case "disliked":
        return [...DislikedArticles].reverse();
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-3 bg-neutral-200">
      <div className="bg-neutral-300 w-full flex flex-col justify-center items-center flex-wrap rounded-xl">
        <div
          className="sm:hidden w-full flex justify-end mr-10"
          onClick={() => setIsOpen(!isOPen)}
        >
          <MenuIcon />
        </div>
        <div
          className={`sm:flex  justify-between items-center w-full flex-wrap ${
            isOPen ? "block" : "hidden"
          } `}
        >
          <div>
            <Button
              value="BACK"
              onClick={() => (window.location.href = "/")}
              cl="bg-gray-700 text-white hover:bg-gray-600 ml-3"
            />
          </div>
          <div className=" flex  flex-col sm:flex-row  flex-wrap gap-4  items-center  sm:justify-evenly p-5 rounded-xl">
            <Button
              value="Saved"
              onClick={() => setView("saved")}
              cl={`text-white font-bold px-4 py-2 w-20 rounded-lg ${
                view === "saved" ? "bg-gray-800" : "bg-gray-600"
              } 
          transition-colors duration-300 hover:bg-gray-700`}
            />
            <Button
              value="Liked"
              onClick={() => setView("liked")}
              cl={`text-white font-bold px-4 py-2 w-20 rounded-lg ${
                view === "liked" ? "bg-gray-800" : "bg-gray-600"
              } 
          transition-colors duration-300 hover:bg-gray-700`}
            />
            <Button
              value="Disliked"
              onClick={() => setView("disliked")}
              cl={`text-white font-bold flex justify-center items-center py-2  w-20 rounded-lg ${
                view === "disliked" ? "bg-gray-800" : "bg-gray-600"
              } 
          transition-colors duration-300 hover:bg-gray-700`}
            />
          </div>
          <ProfileDropdown />
        </div>
      </div>
      <h1 className="mt-3 text-2xl bg-neutral-100 p-2 rounded-lg text-black font-bold">
        {title} Articles
      </h1>
      {renderArticle().length === 0 ? (
        <h1>No Articles </h1>
      ) : (
        <div className="flex flex-row flex-wrap gap-3 justify-evenly my-5">
          {renderArticle().map((article) => {
            const isSaved = savedArticles.some(
              (item) => item.url === article.url
            );
            const isLiked = LikedArticles.some(
              (item) => item.url === article.url
            );
            const isDisliked = DislikedArticles.some(
              (item) => item.url === article.url
            );

            return (
              <div
                className="max-w-full bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-4 p-6"
                key={article.url}
              >
                <div className="sm:flex ">
                  <img
                    src={article.urlToImage || paper}
                    alt="News"
                    className="sm:w-1/3 h-48 object-contain mb-4"
                  />
                  <div className="ml-6 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{article.description}</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">{article.content}</p>
                <div className="flex justify-between gap-8 items-center mt-4 ">
                  <div className="flex flex-1  gap-2  max-w-[50%]">
                    <p className="text-sm text-gray-500 flex-1">
                      {article.author}
                    </p>
                    <a
                      href={article.url}
                      className="underline hover:text-blue-500"
                    >
                      Read More
                    </a>
                  </div>
                  <div className="flex">
                    <div className="flex justify-end">
                    {view === "saved" ? (
                      <Button
                        value="Remove"
                        onClick={() => handleRemove(article.url)}
                        cl="hover:bg-gray-100 flex"
                      />
                    ) : (
                      <Button
                        value={isSaved ? "SAVED" : "SAVE"}
                        onClick={() => handleSave(article)}
                      />
                    )}
                    <div className="flex justify-end max-w-[50%] ">
                      <Button
                        value={<FaThumbsUp />}
                        onClick={() => handleLikeClick(article)}
                        cl={`text-2xl  max-w-fit  ${
                          isLiked ? "text-blue-500" : "text-gray-400"
                        }`}
                      />
                      <Button
                        value={<FaThumbsDown />}
                        onClick={() => handleDislikeClick(article)}
                        cl={`text-2xl max-w-fit  ${
                          isDisliked ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                      </div>
                    </div>
                    {/* <button
                      onClick={() => handleLikeClick(article)}
                      className={`text-2xl ${
                        isLiked ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      <FaThumbsUp />
                    </button> 
                     <button
                      onClick={() => handleDislikeClick(article)}
                      className={`text-2xl ${
                        isDisliked ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      <FaThumbsDown />
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
          <ScrollToTop />
        </div>
      )}
    </div>
  );
};
export default User;
