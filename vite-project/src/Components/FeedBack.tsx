import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { MessageCircle } from "lucide-react";
import { addFeedBack } from "../store/feedbackSlice";
const FeedBack = ()=>{
    const {user} = useAuth0();
    const dispatch = useDispatch();
    const [open , setOpen] = useState(false);
    const [formData, setFormData] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        rating: 0,
      });
      const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            const {name,value} = e.target;
            setFormData({
                ...formData,
                [name]:name === 'rating'? parseInt(value) : value
            });
      };
     
    const handleSave = (e:React.FormEvent)=>{
        console.log("fff");

        
        // if(!user) return;
        const FeedBackItem ={
            user:user?.email,
            saved:[formData]
          }
          
            dispatch(addFeedBack(FeedBackItem));
            setOpen(false)
    }
    return <div>
        <MessageCircle onClick={()=>setOpen(!open)}/>
        {open && (
            <div>
                <input type="text" value={formData.input1} name="input1" onChange={handleChange} placeholder="What type of content would you like to see more of ?"/>
                <input type="text" value={formData.input2} name="input2"  onChange={handleChange} placeholder="Do you find the reading experience on our website/app comfortable" />
                <input type="text" value={formData.input3}  name="input3" onChange={handleChange} placeholder="Are the headlines of our articles clear and engaging?" />
                <input type="text"  value={formData.input4}  name="input4" onChange={handleChange} placeholder="How satisfied are you with the search functionality on our platform?" />
                <input type="number"  value={formData.rating}  name="rating" onChange={handleChange} placeholder="Rate us out of 5" />
                <button onClick={handleSave}>Submit</button>
            </div>
        )}
    </div>
}
export default FeedBack;