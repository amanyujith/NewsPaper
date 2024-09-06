import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { MessageCircle } from "lucide-react";
import { addFeedBack } from "../store/feedbackSlice";
import Form from "./Form";
import Modal from "./Modal";
import { SquareCheckBig } from 'lucide-react';
import { CircleX } from 'lucide-react';

const FeedBack = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message ,setMessage] = useState('');
  const [isModalOpen , setIsmodalopen] = useState(false);
  const [Icon, setIcon] = useState(<SquareCheckBig />);
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    rating: 1,
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
        setMessage('Fill All The Fields')
        setIsmodalopen(true)
        setIcon(<CircleX color="red"/>);
      return;
    }
    if (formData.rating > 5) {
        setMessage("Rating must be 5 or less");
        setIsmodalopen(true);
        setIcon(<CircleX color="red"/>);
        return;
      }
    dispatch(addFeedBack(FeedBackItem));
    setMessage('Submitted Successfully')
    setIcon(<SquareCheckBig color="green"/>)
    setOpen(false);
    setFormData({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      rating: 1,
    });
    setIsmodalopen(true)
  };
  useEffect(()=>{
    if(isModalOpen){
        const timer = setTimeout(()=>{
            setIsmodalopen(false);
        },3000);
        return()=> clearTimeout(timer)
    }
  })
  const handleClose = ()=>{
    setOpen(false)
    setFormData({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      rating: 1,
    });
  }
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
          onClose={ handleClose}
          formData={formData}
        />
      )}
      <Modal
      isOpen={isModalOpen} message={message} Icon={Icon}
      />
    </div>
  );
};
export default FeedBack;
