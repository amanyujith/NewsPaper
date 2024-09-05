import { useDispatch } from "react-redux";
import { setApiEndPoints } from "../store/apiSlice";
import { useState } from "react";
import {
  BriefcaseBusiness,
  Cpu,
  HeartPulse,
  House,
  Telescope,
  Trophy,
} from "lucide-react";

const NavBar = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState("");

  const handleClick = (buttonId: string, endpoint: string) => {
    dispatch(setApiEndPoints(endpoint));
    setIsClicked(buttonId);
  };

  return (
    <div className="">
      <div className="flex bg-gray-700 text-white gap-5">
        <nav className="flex justify-evenly flex-wrap gap-4 w-full p-3">
          {[
            {
              id: "all",
              label: "ALL NEWS",
              icon: <House />,
              endpoint: "everything?q=general",
            },
            {
              id: "Science",
              label: "SCIENCE",
              icon: <Telescope />,
              endpoint: "everything?q=science",
            },
            {
              id: "Sports",
              label: "SPORTS",
              icon: <Trophy />,
              endpoint: "everything?q=sports",
            },
            {
              id: "Tech",
              label: "TECHNOLOGY",
              icon: <Cpu />,
              endpoint: "everything?q=technology",
            },
            {
              id: "Health",
              label: "HEALTH",
              icon: <HeartPulse />,
              endpoint: "everything?q=health",
            },
            {
              id: "Business",
              label: "BUSINESS",
              icon: <BriefcaseBusiness />,
              endpoint: "everything?q=business",
            },
          ].map((button) => (
            <button
              key={button.id}
              onClick={() => handleClick(button.id, button.endpoint)}
              className="flex justify-center items-center w-32 h-5 text-sm font-semibold  transition duration-300 ease-in-out"
            >
              {isClicked === button.id ? (
                button.icon
              ) : (
                <>
                  <span className="hidden sm:inline">{button.label}</span>
                  <span className="sm:hidden">{button.icon}</span>
                </>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
