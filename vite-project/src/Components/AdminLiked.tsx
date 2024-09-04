import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import ScrollToTop from "./ScrollToTop";
import paper from "../assets/paper.jpeg";
import Button from "../Utilities/Button";

const AdminLiked = () => {
  const { user } = useParams<{ user: string }>();
  const articles = useSelector((state: RootState) => {
    const userArticles = state.likedArticles.articles.find(
      (entry) => entry.user === user
    );
    return userArticles ? userArticles.liked : [];
  });
  return (
    <div>
      <div>
        <Button
          value="BACK"
          onClick={() => (window.location.href = "/admin")}
          cl="bg-gray-700 text-white hover:bg-gray-600 ml-3 mt-2"
        />
        <h1 className=" flex justify-center text-black font-bold text-2xl">
          LIKED ARTICLES
        </h1>
      </div>
      {articles.map((article) => (
        <div className="max-w-full bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-4 p-6">
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
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">{article.author}</p>
            <a href={article.url}>Read More</a>
            <div className="flex space-x-4"></div>
          </div>

          <ScrollToTop />
        </div>
      ))}
    </div>
  );
};
export default AdminLiked;
