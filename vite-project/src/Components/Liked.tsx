// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useDispatch } from "react-redux";
// import {RemoveLike} from '../store/likesSlice'
// // import { likeArticle,disLikeArticle } from "../store/likesSlice";
// const Liked = ()=>{
//     const {user} = useAuth0();
//     const userId  = user?.email;
//     const dispatch = useDispatch();
//     const removeLike = (url:string)=>{
//         dispatch(RemoveLike({user:user?.email,url:url}))
//     }
    
//     const LikedArticles = useSelector((state: RootState) => {
//         const userArticles = state.likedArticles.articles.find(article => article.user === userId);
//         return userArticles ? userArticles.liked : [];
//       });
      
//       const DisLikedArticles = useSelector((state: RootState) => {
//         const userArticles = state.likedArticles.articles.find(article => article.user === userId);
//         return userArticles ? userArticles.disliked : [];
//       });
//     console.log("lik",LikedArticles);
    
//     console.log("Dis",DisLikedArticles);
    
//     return <div>
//             <h1>Liked</h1>
//             <div>
//                 {LikedArticles.map((article,index)=>
//                 <div key={index}>
//                 <img src={article.urlToImage} alt="" />
//                 <h1>{article.title}</h1>
//                <button onClick={()=>removeLike(article.url)}>Remove</button>
//             </div>
//                 )}
//             </div>
//             <h1>Dis Liked</h1>
//             <div>
//                 {DisLikedArticles.map((article,index)=>
//                 <div key={index}>
//                 <img src={article.urlToImage} alt="" />
//                 <h1>{article.title}</h1>
               
//             </div>
//                 )}
//             </div>
//     </div>
// }
// export default Liked;