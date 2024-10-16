

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePowerSettingsNew } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import Cookies from "js-cookie";
import { auth } from "@/firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate= useNavigate();
  const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  console.log('User data from localStorage:', userData)

    const handleLogout = async() => {
      await auth.signOut();
      navigate("/login");
      Cookies.remove("user");
      Cookies.remove("user_token");
      Cookies.remove("user_id");
      window.location.reload();
    };
  return (
    <header className="h-12 px-6 sm:px-10 bg-white shadow-sm sticky top-0 z-50">
    <div className="flex justify-between items-center pt-2">
      <div className="text-sm font-semibold flex items-center gap-2"><FaUserTie />{userData?.name}</div>
      <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className=" p-1 rounded cursor-pointer hover:text-text-red transition-all ">
            <IoPersonCircleOutline className="text-xl  " />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col text-xs ">
              <p className="flex  items-center gap-1 ">
                <MdOutlineEmail className="text-base text-center text-red-700 " />

                <span>{userData?.email}</span>
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout}>
            <p className="text-xs flex items-center gap-2 font-medium">
              <MdOutlinePowerSettingsNew className="text-red-700 text-base " />{" "}
              Log out
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
           </DropdownMenu>
      </div>
    </div>
  </header>
  )
}

export default Navbar
