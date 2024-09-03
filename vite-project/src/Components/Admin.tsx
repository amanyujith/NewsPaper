import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { selectedUsersWithSavedArticles } from "../store/newsSlice";
import { selectedUsersWithLikedArticles ,selectedUsersWithDisLikedArticles} from "../store/likesSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Utilities/Button";
import { selectedUsersWithFeedback } from "../store/feedbackSlice";

const Admin = ()=>{
    const navigate = useNavigate();
    const savedUsers = useSelector((state:RootState)=>selectedUsersWithSavedArticles(state));
    const likedUsers  = useSelector((state:RootState)=>selectedUsersWithLikedArticles(state));
    const dislikedUsers = useSelector((state:RootState)=>selectedUsersWithDisLikedArticles(state));
    const usersFeedback = useSelector((state:RootState)=>selectedUsersWithFeedback(state));
    const [view , setView] = useState('saved');
   console.log(savedUsers);
   
    const renderArticle = ()=>{
        switch(view){
            case 'saved':
                return [...savedUsers].reverse();
            case 'liked':
                return [...likedUsers].reverse();
            case 'disliked':
                return [...dislikedUsers].reverse();
            case 'feedback':
                return [...usersFeedback].reverse();
            default :
            return [];
        }
    }
    const handleView = (user:string)=>{
        if(view==='saved'){
            navigate(`/saved/${user}`)
        }
        else if(view==='liked'){
            navigate(`/liked/${user}`)
        }
        else if(view==='disliked'){
            navigate(`/disliked/${user}`)
        }
        else if (view==='feedback'){
            navigate(`/feedback/${user}`)
        }
    }
    // const userId = user?.email
      return <div className="flex flex-col justify-center items-center gap-4 ">
        <h1>ADMIN</h1>
        
        <div className=" flex gap-4 mb-4 bg-gray-700 w-1/3 justify-evenly p-7 rounded-xl">
         <Button value="Saved" onClick={()=>setView('saved')} cl={`text-white font-bold px-4 py-2 rounded-lg ${view==="saved" ? "bg-gray-800" : "bg-gray-600"} transition-colors
         duration-300 hover:bg-gray-500`}/>
         <Button value="Liked" onClick={()=>setView('liked')} cl={`text-white font-bold px-4 py-2 rounded-lg ${view==="liked" ? "bg-gray-800" : "bg-gray-600"} transition-colors 
        duration-300 hover:bg-gray-500`}/>
        <Button value="Disliked" onClick={()=>setView('disliked')} cl={`text-white font-bold px-4 py-2 rounded-lg ${view==="disliked" ? "bg-gray-800" : "bg-gray-600"} transition-colors
         duration-300 hover:bg-gray-500`}/>
         <Button value="Feedbacks" onClick={()=>setView('feedback')} cl={`text-white font-bold px-4 py-2 rounded-lg ${view==="feedback" ? "bg-gray-800" : "bg-gray-600"} transition-colors
         duration-300 hover:bg-gray-500`}/>
        </div>
        <div className=" flex justify-center w-full">
        <table className="  border-collapse border border-gray-200 w-full mx-28">
            <thead>
                <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">USER</th>
                <th className="border border-gray-300 px-4 py-2">LIST</th>
                </tr>
            </thead>
            <tbody>
               {renderArticle().map((user,index)=>(
                <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 ">{user}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <Button value="View" onClick={()=>handleView(user)}/>
                        {/* <button onClick={()=>handleView(user)}>View Articles</button> */}
                    </td>
                </tr>
               ))}
            </tbody>
        </table>
        </div>
        {/* <ul>
        {renderArticle().map((user,index)=>(
            <li key={index}>
                {user}
               
                <button onClick={()=>handleView(user)}>View Articles</button>
            </li>
        ))
        }
        </ul> */}
    </div>
}
export default Admin