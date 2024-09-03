import { createSlice } from "@reduxjs/toolkit";

const initialState={
    apiEndPoints :'everything?q=general',
    language:'en',
    sortBy:'relevancy'
};
const apiSlice = createSlice({
    name:'api',
    initialState,
    reducers:{
        setApiEndPoints:(state,action)=>{
            state.apiEndPoints = action.payload;
        },
        setLanguage:(state,action)=>{
            state.language = action.payload
        },
        setSortBy:(state,action)=>{
            state.sortBy = action.payload
        }
    }
})
export default apiSlice.reducer;
export const {setApiEndPoints,setLanguage,setSortBy} = apiSlice.actions;