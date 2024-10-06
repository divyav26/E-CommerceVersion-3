

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePowerSettingsNew } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";


const Navbar = () => {
    // const userData = "divya"

    const handleLogout = () => {
        
    };
  return (
    <header className="h-12 px-6 sm:px-10 bg-white shadow-sm sticky top-0 z-50">
    <div className="flex justify-between items-center pt-2">
      <div className="text-sm font-semibold flex items-center gap-2"><FaUserTie />email</div>
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

                <span>Email</span>
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
