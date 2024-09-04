import { createSelector, createSlice } from "@reduxjs/toolkit";
interface feedbackItem{
    input1:string
    input2:string
    input3:string
    input4:string
    rating:number
}
interface userFeedback{
    user:string
    saved:feedbackItem[];
}
interface feedback{
    feedback:userFeedback[];
}
const initialState:feedback={
    feedback:[]
}

const feedbackSlice = createSlice({
    name:'feedback',
    initialState,
    reducers:{
        addFeedBack:(state,action)=>{
            const newsFeedback = action.payload;
            const existingIndex = state.feedback.findIndex(fb => fb.user === newsFeedback.user);
            if(existingIndex!==-1){
                state.feedback[existingIndex] = newsFeedback
            }
            else{
                state.feedback.push(action.payload)
                         }
            // state.feedback.push(action.payload)
        }
    }
});

//   export const selectedUsersWithFeedback = (state:{feedback:feedback})=>{
//     const users = state.feedback.feedback.filter(entry=>entry.saved.length>0)
//     .map(article=>article.user)
//     return Array.from(new Set(users));
// }
const selectFeedback = (state: { feedback: feedback }) => state.feedback;

// Memoized selector to get unique users with feedback
export const selectedUsersWithFeedback = createSelector(
  [selectFeedback],
  (feedback) => {
    const users = feedback.feedback.filter(entry => entry.saved.length > 0)
      .map(article => article.user);
    return Array.from(new Set(users));
  }
);
export const {addFeedBack } = feedbackSlice.actions;
export default feedbackSlice.reducer;