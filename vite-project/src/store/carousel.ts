import { createSlice } from "@reduxjs/toolkit";

interface CarouselItem {
    title: string;
    url: string;
    author: string;
    content: string;
    description: string;
    // date: string;
    urlToImage: string;
}

interface CarouselArticles {
    articles:CarouselItem[];
}
const initialState:CarouselArticles ={
    articles:[]
}
const CarouselArticlesSlice = createSlice({
    name:'carousel',
    initialState,
    reducers:{
        CarouselArticle:(state,action)=>{
            state.articles=action.payload;
        }
    }
})
export const {CarouselArticle}  = CarouselArticlesSlice.actions;
export default CarouselArticlesSlice.reducer;