import { createSelector, createSlice } from "@reduxjs/toolkit";

interface SavedItem {
    title: string;
    url: string;
    author: string;
    content: string;
    description: string;
    // date: string;
    urlToImage: string;
}
interface NewsArticles{
    user:string
    saved:SavedItem[]
    // total:number
}
interface SavedArticles {
    articles:NewsArticles[];
}
const initialState:SavedArticles ={
    articles:[]
}

const SavedArticlesSlice  = createSlice({
    name:'savedArticles',
    initialState,
    reducers:{
        addArticle:(state,action)=>{
            const {user,article} = action.payload
            const userArticle = state.articles.find((entry)=>entry.user===user)
            if(userArticle){
                const articleExists = userArticle.saved.some((item)=>item.url===article.url)
                {
                    if(!articleExists){
                            userArticle.saved.push(article)
                    }
                    else{
                       userArticle.saved= userArticle.saved.filter((item)=>item.url!==article.url)
                    }
                }
            }
            else{
                    state.articles.push({
                        user,
                        saved:[article]
                    })
            }
        },
        removeArticle:(state,action)=>{
            const {user,url} = action.payload;
            const userArticle = state.articles.find((entry)=>entry.user===user)
           if(userArticle){
            userArticle.saved = userArticle.saved.filter((item)=>item.url!==url)
           }
        //     if (state[user]) {
        //         state[user].saved = state[user].saved.filter(savedArticle => savedArticle.url !== url);
        //         state[user].total = state[user].saved.length;
        // }
    
    },
}
});
// export const selectedUsersWithSavedArticles = (state:{savedArticles:SavedArticles}) =>{
//     const users = state.savedArticles.articles.map(article => article.user);
//     return Array.from(new Set(users));
// }
const selectSavedArticles = (state: { savedArticles: SavedArticles }) => state.savedArticles;

// Memoized selector to get unique users with saved articles
export const selectedUsersWithSavedArticles = createSelector(
  [selectSavedArticles],
  (savedArticles) => {
    const users = savedArticles.articles.map(article => article.user);
    return Array.from(new Set(users));
  }
);
export const {addArticle,removeArticle} = SavedArticlesSlice.actions;
export default SavedArticlesSlice.reducer;