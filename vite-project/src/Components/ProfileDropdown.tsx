import { Dropdown, DropdownItem } from "react-bootstrap";
// import LogoutButton from "../Auth0/Logout"
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";
import Button from "../Utilities/Button";
import Logout from "../Auth0/Logout";

const ProfileDropdown = () => {
  const { user, logout } = useAuth0();

  const [dropdownOpen, setDropDownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };
  return (
    <div className="relative ">
      <Dropdown
        align="end"
        onToggle={toggleDropdown}
        className=" flex flex-col pr-3 gap-10 items-center text-black text-lg"
      >
        <Dropdown.Toggle as="div" className="cursor-pointer">
          <img
            src={user?.picture}
            alt={user?.name}
            className="w-12 rounded-lg duration-300 drop-shadow-sm shadow-lg hover:shadow-slate-700 hover:-translate-y-2"
          />
        </Dropdown.Toggle>

        {dropdownOpen && (
          <Dropdown.Menu className="items-center text-black text-sm focus:outline-none  hover:translate-y-2 px-2 bg-white border-neutral-100 border-2">
            <Dropdown.Item className="pl-4 font-bold ">
              <div></div>
              <div className="">{user?.email}</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div className="flex flex-row py-2">
                <div className=" flex ">
                  <LogOut onClick={() => logout} />
                  <Logout />
                  {/* <Button value="Logout" onClick={logout} cl=""/> */}
                </div>
              </div>
            </Dropdown.Item>
            {user?.email === "amanyujith4444@gmail.com" && (
              <DropdownItem className="text-black font-bold ">
                <Button
                  value="Portal"
                  onClick={() => (window.location.href = "/admin")}
                />
              </DropdownItem>
            )}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};
export default ProfileDropdown;
