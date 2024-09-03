import { configureStore } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import apiReducer from './apiSlice';
import savedArticlesReducer from './newsSlice'
import storage from "redux-persist/lib/storage";
import likedArticlesReducer from './likesSlice'
import topArticleReducer from './topSlice'
import carouselArticleReducer from '../store/carousel';
import feedbackReducer from '../store/feedbackSlice'
const articlePersistConfig = {
    key:'article',
    storage
}
const likedPersistConfig = {
    key:'like',
    storage
}
const apiPersistConfig = {
    key:'api',
    storage
}
const topPersistConfig = {
    key:'top',
    storage
}
const carouselPersistConfig = {
    key:'carousel',
    storage
}
const feedbackPersistConfig = {
    key:'feedback',
    storage
}
const persistedApiReducer = persistReducer(apiPersistConfig,apiReducer)
const persistedSavedArticlesReducer  = persistReducer(articlePersistConfig,savedArticlesReducer);
const persistedLikedArticlesReducer = persistReducer(likedPersistConfig,likedArticlesReducer);
const persistedTopArticleReducer = persistReducer(topPersistConfig,topArticleReducer);
const persistedCarouselArticleReducer = persistReducer(carouselPersistConfig,carouselArticleReducer);
const persistedFeedbackReducer = persistReducer(feedbackPersistConfig,feedbackReducer);
const store = configureStore({
    reducer:{
        api:persistedApiReducer,
        savedArticles:persistedSavedArticlesReducer,
        likedArticles:persistedLikedArticlesReducer,
        topArticles:persistedTopArticleReducer,
        carousel:persistedCarouselArticleReducer,
        feedback:persistedFeedbackReducer
    },
});
export const persistor =  persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;