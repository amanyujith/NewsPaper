import { createSelector, createSlice } from "@reduxjs/toolkit";

interface SavedItem {
    title: string;
    url: string;
    author: string;
    content: string;
    description: string;
    urlToImage: string;
}

interface NewsArticles{
    user:string
    liked:SavedItem[]
    disliked:SavedItem[]
}

interface likedArticles{
    articles:NewsArticles[]
}

const initialState:likedArticles = {
    articles:[]
    
};
console.log(initialState.articles,'arrrr');

const LikedArticleSlice = createSlice({
    name:'likedArticles',
    initialState,
    reducers:{
        likeArticle:(state,action)=>{
            const { user, article } = action.payload;
            const userArticle = state.articles.find((entry) => entry.user === user);
      if (userArticle) {
        const articleExists = userArticle.liked.some((item) => item.url === article.url);
        if (!articleExists) {
          userArticle.liked.push(article);
          userArticle.disliked=userArticle.disliked.filter(item=>item.url!==article.url)
        }       
        else{
            userArticle.liked = userArticle.liked.filter(item=>item.url!==article.url)
        } 
      } else {
       
        state.articles.push({
          user,
          liked: [article], 
          disliked: [],    
        });
      }
        },
        disLikeArticle:(state,action)=>{
            const {user,article} = action.payload;
            const userArticle = state.articles.find((entry)=>entry.user===user)
            if(userArticle){
                const articleExists = userArticle.disliked.some((item)=>item.url===article.url)
                if(!articleExists){
                    userArticle.disliked.push(article);
                    userArticle.liked=userArticle.liked.filter((item)=>item.url!==article.url)
                }
                else{
                    userArticle.disliked = userArticle.disliked.filter(item=>item.url!==article.url)
                }
            }
            else{
                    state.articles.push({
                        user,
                        liked:[],
                        disliked:[article]
                    })
                }
        },
        RemoveLike:(state,action)=>{
            const {user,url} = action.payload;
            const userArticle = state.articles.find((entry)=>entry.user===user)
            if(userArticle){
               userArticle.liked= userArticle.liked.filter((item)=>item.url!==url)
            }
        },
        RemoveDislike:(state,action)=>{
            const {user,url} = action.payload;
            const userArticle = state.articles.find(entry=>entry.user===user);
            if(userArticle){
                userArticle.disliked = userArticle.disliked.filter(item=>item.url!==url)
            }
        }
    }
})
// export const selectedUsersWithLikedArticles = (state:{likedArticles:likedArticles})=>{
//     const users = state.likedArticles.articles.filter(entry => entry.liked.length > 0)
//     .map(article=>article.user);
//     return Array.from(new Set(users));
// }
// export const selectedUsersWithDisLikedArticles = (state:{likedArticles:likedArticles})=>{
//     const users = state.likedArticles.articles.filter(entry => entry.disliked.length > 0)
//     .map(article=>article.user);
//     return Array.from(new Set(users));
// }
const selectLikedArticles = (state: { likedArticles: likedArticles }) => state.likedArticles;

// Memoized selector to get unique users with liked articles
export const selectedUsersWithLikedArticles = createSelector(
  [selectLikedArticles],
  (likedArticles) => {
    const users = likedArticles.articles.filter(entry => entry.liked.length > 0)
      .map(article => article.user);
    return Array.from(new Set(users));
  }
);

// Base selector to get disliked articles from state
const selectDislikedArticles = (state: { likedArticles: likedArticles }) => state.likedArticles;

// Memoized selector to get unique users with disliked articles
export const selectedUsersWithDisLikedArticles = createSelector(
  [selectDislikedArticles],
  (likedArticles) => {
    const users = likedArticles.articles.filter(entry => entry.disliked.length > 0)
      .map(article => article.user);
    return Array.from(new Set(users));
  }
);
export const {likeArticle,disLikeArticle,RemoveLike,RemoveDislike} = LikedArticleSlice.actions;
export default LikedArticleSlice.reducer;