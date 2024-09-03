import { createSlice } from "@reduxjs/toolkit";

interface TopProps{
    author:string
        title:string
        url:string
        content:null
        description:null
        urlToImage:null
        publishedAt:Date
        source:
    {id:string, name:string}
}
interface TopArticle{
    article:TopProps[]
}
const initialState : TopArticle={
    article:[]
}

const TopArticlesSlice = createSlice({
    name:'topArticles',
    initialState,
    reducers:{
            topArticle:(state,action)=>{
                    state.article=action.payload;
            }       
    }
})
export const {topArticle} = TopArticlesSlice.actions;
export default TopArticlesSlice.reducer;