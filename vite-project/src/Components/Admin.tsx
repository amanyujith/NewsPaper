import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { selectedUsersWithSavedArticles } from "../store/newsSlice";
import {
  selectedUsersWithLikedArticles,
  selectedUsersWithDisLikedArticles,
} from "../store/likesSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Utilities/Button";
import { selectedUsersWithFeedback } from "../store/feedbackSlice";
import { MenuIcon } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const savedUsers = useSelector((state: RootState) =>
    selectedUsersWithSavedArticles(state)
  );
  const likedUsers = useSelector((state: RootState) =>
    selectedUsersWithLikedArticles(state)
  );
  const dislikedUsers = useSelector((state: RootState) =>
    selectedUsersWithDisLikedArticles(state)
  );
  const usersFeedback = useSelector((state: RootState) =>
    selectedUsersWithFeedback(state)
  );
  const [view, setView] = useState("saved");
  const [title, SetTitle] = useState("Saved");
  console.log(savedUsers);
  const [isOPen, setIsOpen] = useState(false);

  const renderArticle = () => {
    switch (view) {
      case "saved":
        return [...savedUsers].reverse();
      case "liked":
        return [...likedUsers].reverse();
      case "disliked":
        return [...dislikedUsers].reverse();
      case "feedback":
        return [...usersFeedback].reverse();
      default:
        return [];
    }
  };
  const handleView = (user: string) => {
    if (view === "saved") {
      navigate(`/saved/${user}`);
    } else if (view === "liked") {
      navigate(`/liked/${user}`);
    } else if (view === "disliked") {
      navigate(`/disliked/${user}`);
    } else if (view === "feedback") {
      navigate(`/feedback/${user}`);
    }
  };
  useEffect(() => {
    if (view === "saved") {
      SetTitle("Saved");
    } else if (view === "liked") {
      SetTitle("Liked");
    } else if (view === "disliked") {
      SetTitle("Disliked");
    } else if ("feedback") {
      SetTitle("FeedBacks");
    }
  }, [view]);
  // const userId = user?.email
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-3 ">
      {/* <h1>ADMIN</h1> */}
      <div className="bg-neutral-300 w-full flex flex-col justify-center items-center flex-wrap rounded-xl mt-2">
        <div
          className="sm:hidden w-full flex justify-end mr-10"
          onClick={() => setIsOpen(!isOPen)}
        >
          <MenuIcon />
        </div>
        <div
          className={`sm:flex  justify-between items-center w-full flex-wrap ${
            isOPen ? "block" : "hidden"
          } `}
        >
          <div>
            <Button
              value="BACK"
              onClick={() => (window.location.href = "/")}
              cl="bg-gray-700 text-white hover:bg-gray-600 ml-3"
            />
          </div>
          <div className=" flex  flex-col sm:flex-row  flex-wrap gap-4  items-center  sm:justify-evenly p-5 rounded-xl">
            <Button
              value="Saved"
              onClick={() => setView("saved")}
              cl={`text-white font-bold px-4 py-2 w-24 rounded-lg ${
                view === "saved" ? "bg-gray-800" : "bg-gray-600"
              } 
          transition-colors duration-300 hover:bg-gray-700`}
            />
            <Button
              value="Liked"
              onClick={() => setView("liked")}
              cl={`text-white font-bold px-4 py-2 w-24 rounded-lg ${
                view === "liked" ? "bg-gray-800" : "bg-gray-600"
              } 
          transition-colors duration-300 hover:bg-gray-700`}
            />
            <Button
              value="Disliked"
              onClick={() => setView("disliked")}
              cl={`text-white font-bold flex justify-between items-center py-2  w-24 rounded-lg ${
                view === "disliked" ? "bg-gray-800" : "bg-gray-600"
              } 
          transition-colors duration-300 hover:bg-gray-700`}
            />
            <Button
              value="Feedback"
              onClick={() => setView("feedback")}
              cl={`text-white font-bold flex justify-between items-center py-2  w-24 rounded-lg ${
                view === "feedback" ? "bg-gray-800 " : "bg-gray-600"
              }  `}
            />
          </div>
          <button className="w-20"></button>
        </div>
      </div>
      <h1 className="mt-3 text-2xl bg-neutral-100 p-2 rounded-lg text-black font-bold">
        {title}
      </h1>
      <div className=" flex justify-center w-full">
        <table className="  border-collapse border border-gray-200 w-full mx-28">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">USER</th>
              <th className="border border-gray-300 px-4 py-2">LIST</th>
            </tr>
          </thead>
          <tbody>
            {renderArticle().map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {user}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  <Button value="View" onClick={() => handleView(user)} />
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
  );
};
export default Admin;
