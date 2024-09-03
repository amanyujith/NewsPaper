import { createSlice } from "@reduxjs/toolkit";
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
            state.feedback.push(action.payload)
        }
    }
});
// export const selectUsersWithFeedback = (state: RootState) => {
//     return state.feedback.feedback
//       .filter(userFeedback => userFeedback.saved.length > 0) // Ensure they have provided at least one feedback
//       .map(userFeedback => userFeedback.user); // Extract the user
//   }
  export const selectedUsersWithFeedback = (state:{feedback:feedback})=>{
    const users = state.feedback.feedback.filter(entry=>entry.saved.length>0)
    .map(article=>article.user)
    return Array.from(new Set(users));
}
export const {addFeedBack } = feedbackSlice.actions;
export default feedbackSlice.reducer;