import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiEndPoints,selectApiEndPoints } from "../store/apiSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import paper from "../assets/paper.jpeg";
// import Button from "../Utilities/Button";
import {  Search, User } from "lucide-react";
import Login from "../Auth0/Login";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
const TopBar = () => {
  let menuRef = useRef<HTMLDivElement>(null);
  const [issearch, setIsSearch] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user");
  };
  const currentEndpoint = useSelector(selectApiEndPoints);
console.log(currentEndpoint,"api");

  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric',
    month: 'short',  
    day: 'numeric'   
  };
  
  const formattedDate = currentDate.toLocaleDateString('en-US', options).toUpperCase();
  
const { user, isAuthenticated } = useAuth0();
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setSearch(inputValue);
    const query = inputValue === "" ? "general" : inputValue;
  dispatch(setApiEndPoints(`everything?q=${query}`));
    // if (inputValue !== "") {
    //   dispatch(setApiEndPoints(`everything?q=${search}`));
    // } else {
    //   dispatch(setApiEndPoints(`everything?q=general`));
    // }
  };
  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-container")) {
      setIsSearch(!issearch);
    }
  };
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="  sm:flex  items-center  flex-wrap  px-5 pt-2 ">
     
      <div className="flex gap-2  w-[300px]"  ref={menuRef}>
        <DropDown />
        <Search
          onClick={() => setIsSearch(!issearch)}
          className="cursor-pointer"
          
        />
        {issearch && (
          <div
            className="modal-container w-32 absolute top-10 left-12 mt-2 "
            onClick={handleCloseModal}
           
          >
            <input
              type="text"
              onChange={handleInput}
              value={search}
              placeholder="Search..."
              className="flex-1 px-4 py-2 mr-4 border border-gray-300 rounded-lg "
            />
          </div>
        )}
         <p className="font-semibold">{formattedDate}</p>
      </div>
     
      <h1 className="flex flex-1 justify-center items-center w-full  sm:w-fit text-black font-extrabold text-xl" >
        News <img src={paper} alt="" height="10" width="40" /> Daily
      </h1>
      <div className="flex w-[300px]  sm:justify-end gap-2 items-center">
       <div className="flex gap-1">
      <a href="https://www.instagram.com/_am4nyuj1th._/?next=%2F"><FaInstagram size={25} className="cursor-pointer  hover:text-red-500"/></a>
      <a href="https://www.facebook.com/amanyujith.raj"> <FaFacebookF size={25} className="cursor-pointer  hover:text-blue-500"/></a>

       </div>
        {isAuthenticated ? (
          <img
            src={user?.picture}
            alt=""
            height="50"
            width="50"
            onClick={handleClick}
            className="rounded-full cursor-pointer border-2 border-neutral-200 hover:border-neutral-400 transition-all duration-100 w-10 mb-1"
          />
        ) : (
          <div className="flex ">
            <Login />
            <User
              onClick={() => loginWithRedirect()}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default TopBar;
