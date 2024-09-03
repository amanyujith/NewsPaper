import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import ScrollToTop from "./ScrollToTop";
import paper from '../assets/paper.jpeg'

const AdminDisliked = ()=>{
    const {user} = useParams<{user:string}>();
    const articles = useSelector((state:RootState)=>{
        const userArticles = state.likedArticles.articles.find(entry=>entry.user===user);
        return userArticles? userArticles.disliked :[];
    })
    return  <div>
    <h1>DISLIKED ARTICLES</h1>
    {articles.map((article)=>(
        <div className="max-w-full bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-4 p-6">
        <div className="sm:flex ">
          <img src={article.urlToImage||paper} alt="News" className="sm:w-1/3 h-48 object-contain mb-4" />
          <div className="ml-6 flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
            <p className="text-gray-600 mt-2">{article.description}</p>
          </div>
        </div>
        <p className="text-gray-600 mt-4">{article.content}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">{article.author}</p>
          <a href={article.url}>Read More</a>
          <div className="flex space-x-4">
           
            
            
            
          </div>
        </div>
        
        <ScrollToTop />
      </div>
    ))}
</div>
}
export default AdminDisliked