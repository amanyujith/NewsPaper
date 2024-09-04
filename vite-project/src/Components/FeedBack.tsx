import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { MessageCircle } from "lucide-react";
import { addFeedBack } from "../store/feedbackSlice";
import Form from "./Form";
const FeedBack = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    rating: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };

  const handleSave = () => {
    console.log("fff");
    const FeedBackItem = {
      user: user?.email,
      saved: [formData],
    };
    if (
      formData.input1.trim() === "" ||
      formData.input2 === "" ||
      formData.input3 === "" ||
      formData.rating <= 0
    ) {
      alert("Fill All The Fields");
      return;
    }
    dispatch(addFeedBack(FeedBackItem));
    alert("Done");
    setOpen(false);
  };
  return (
    <div className="">
      <MessageCircle
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <Form
          onChange={handleChange}
          onSubmit={handleSave}
          onClose={() => setOpen(false)}
          formData={formData}
        />
      )}
    </div>
  );
};
export default FeedBack;
