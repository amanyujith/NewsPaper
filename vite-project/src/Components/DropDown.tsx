import {  ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage, setSortBy } from "../store/apiSlice";
const DropDown = ()=>{
    const dispatch = useDispatch()
    const [dropdownOpen,setDropDownOpen] = useState(false);
    const [languageDropdownOpen , setLanguageDropdownOpen] = useState(false);
    const [sortDropdownOpen , setSortDropdownOpen] = useState(false);
    const [languageText , setLanguageText] = useState('Language');
    const [sortText,setSortText] = useState('SortBy')
    const toggleDropdown = () =>setDropDownOpen(!dropdownOpen);
    const toggleLanguageDropdown = () => setLanguageDropdownOpen(!languageDropdownOpen);
    const toggleSortDropdown = () => setSortDropdownOpen(!sortDropdownOpen);
    const handleLanguage = (value:string,text:string)=>{
        console.log(value);
        dispatch(setLanguage(value));
        setLanguageText(text)
        setLanguageDropdownOpen(!languageDropdownOpen)
    };
    const handleSort = (value:string,text:string) =>{
            dispatch(setSortBy(value));
            setSortText(text);
            setSortDropdownOpen(!sortDropdownOpen)
    }
    

    return (
        <div >
            <div className="mb-4">
         <SlidersHorizontal onClick={toggleDropdown} className="cursor-pointer text-gray-600 hover:text-gray-800" />
     </div>
     {dropdownOpen && (
       
         <div className="bg-white shadow-lg rounded-lg p-4 absolute mt-2 w-40 top-6 left-2">
             <button
                 onClick={toggleLanguageDropdown}
                 className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 bg-gray-200 hover:text-gray-900 rounded"
             >
               <div className="flex ">
               { languageText}<ChevronDown />
               </div>
             </button>
             {languageDropdownOpen && (
                 <div className="mt-2">
                     <button
                         onClick={() => {handleLanguage('en','English')}}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         English
                     </button>
                     <button
                         onClick={() => handleLanguage('fr','French')}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         French
                     </button>
                     <button
                         onClick={() => handleLanguage('de','German')}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         German
                     </button>
                     <button
                         onClick={() => handleLanguage('es','Spanish')}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         Spanish
                     </button>
                     <button
                         onClick={() => handleLanguage('zh','Chineese')}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         Chineese
                     </button>
                 </div>
             )}

             <button
                 onClick={toggleSortDropdown}
                 className="w-full text-left mt-4 px-4 py-2 text-gray-700 hover:bg-gray-100 bg-gray-200 hover:text-gray-900 rounded"
             >
                <div className="flex">
                {sortText}<ChevronDown/>
                </div>
             </button>
             {sortDropdownOpen && (
                 <div className="mt-2">
                     <button
                         onClick={() => handleSort('relevancy','Relevancy')}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         Relevancy
                     </button>
                     <button
                         onClick={() => handleSort('publishedAt','Date')}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         Date
                     </button>
                    
                     <button
                         onClick={() => handleSort('popularity','Popularity')}
                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                     >
                         Popularity
                     </button>
                 </div>
             )}
         </div>
         
     )}
 </div>
)}
export default DropDown;