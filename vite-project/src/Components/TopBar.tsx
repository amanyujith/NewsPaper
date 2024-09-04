import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setApiEndPoints } from "../store/apiSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import paper from '../assets/paper.jpeg'
// import Button from "../Utilities/Button";
import {  Search, User } from "lucide-react";
import Login from '../Auth0/Login'
const TopBar = ()=>{
  const [issearch , setIsSearch ] = useState(false)
  const { loginWithRedirect } = useAuth0();
    const [search,setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick= ()=>{
      navigate('/user')
    }
    const {user,isAuthenticated} = useAuth0();
    const handleInput = (e: ChangeEvent<HTMLInputElement>)=>{
      const inputValue = e.target.value.trim();
        setSearch(inputValue)
        if(inputValue!==''){
            dispatch(setApiEndPoints(`everything?q=${search}`))
        }
        else{
            dispatch(setApiEndPoints(`everything?q=general`))
        }
    }
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // Close the dropdown if the click is outside of the dropdown content
      const target = e.target as HTMLElement;
      if (target.classList.contains('modal-container')) {
          setIsSearch(!issearch)
      }
  };
    return  <div className="  sm:flex justify-between items-center  flex-wrap g px-5 pt-2  ">
      <div className="flex gap-2">
    <DropDown/>
      <Search onClick={()=>setIsSearch(!issearch)} className="cursor-pointer"/>
    {issearch && (
      <div className="modal-container w-32 absolute top-10 left-12 mt-2 "onClick={handleCloseModal}>
        <input
      type="text"
      onChange={handleInput}
      value={search}
      placeholder="Search..."
      className="flex-1 px-4 py-2 mr-4 border border-gray-300 rounded-lg "
    />
      </div>
    )}
    </div>
    <h1 className="flex w-full justify-center  sm:w-fit text-black font-extrabold text-xl">News <img src={paper} alt="" height="10" width="40"/> Daily</h1>
  <div>
    {isAuthenticated ? (
      <img src={user?.picture} alt="" height="50" width="50" onClick={handleClick} className="rounded-full cursor-pointer border-2 border-neutral-200 hover:border-neutral-400 transition-all duration-100 w-10 mb-1"/>
    ):(<div className="flex "><Login/><User onClick={()=>loginWithRedirect()} className="cursor-pointer"/></div>)}
  </div>
  </div>
}
export default TopBar;
 