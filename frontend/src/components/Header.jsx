import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAirplaneTicket } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gravatar from "react-gravatar"; // If you're using a Gravatar library

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest("#user-menu")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logout successful 🍀", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div>
      <div className="flex justify-between mb-8 p-6">
        <div className="flex justify-center items-center gap-2 text-center">
          <MdAirplaneTicket className="text-4xl text-purple-500" />
          <div className="text-xl font-semibold">PLANE SCAPE</div>
        </div>
        <div className="flex items-center text-center gap-4">
          <div className="flex items-center font-bold gap-2">
            <FaTags className="text-xl text-purple-500" />
            Deals
          </div>
          <div className="flex items-center font-bold gap-2 ml-4">
            <TbWorld className="text-xl text-purple-500" />
            Discover
          </div>

          <div className="relative" id="user-menu">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Gravatar
                email="johndoe@example.com"
                className="rounded-full w-8 h-8"
              />
              <span className="ml-2">John Doe</span>
            </div>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
