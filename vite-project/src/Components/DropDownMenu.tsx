// import { useDispatch } from "react-redux";
// import { setLanguage,setSortBy } from '../store/apiSlice';
// import { useState } from "react";
// import LoginButton from "../Auth0/Login";
// import { useAuth0 } from "@auth0/auth0-react";
// import LogoutButton from "../Auth0/Logout";
// const DropDownMenu = ()=>{
//     const {isAuthenticated} = useAuth0();
//     const dispatch = useDispatch();
//     // const language = useSelector((state)=>state.api.language);
//     // const sort = useSelector((state)=>state.api.sortBy);
//     const [button , setButton] = useState(false);
//     const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
//         dispatch(setLanguage(e.target.value))
// }
// const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
//         dispatch(setSortBy(e.target.value))
//         // setSort(e.target.value)
// }
// const handleButton = ()=>{
//         setButton(!button);
// }
//     return(
//     <div>
//         <button onClick={handleButton}>Settings</button>
       
//             {button && (
//                 <div>
//                  <div>
//                 <select onChange={handleLanguageChange} defaultValue="en">
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                     <option value="fr">French</option>
//                     <option value="de">German</option>
//                     <option value="zh">Chinese</option>
//                 </select>
//             </div>
//             <div>
//                 <select onChange={handleSortChange} defaultValue="publishedAt">
//                     <option value="publishedAt">publishedAt</option>
//                     <option value="popularity">popularity</option>
//                     <option value="relevancy">relevancy</option>
//                 </select>
//                 </div>
//                 <div>
//                     {isAuthenticated?(
//                         <LogoutButton/>):(<LoginButton/>
//                     )}
//                 </div>
//                 </div>
//             )}
           
//     </div>
// )};
// export default DropDownMenu