

import { RiLogoutCircleRLine } from "react-icons/ri";
import { CgProfile } from 'react-icons/cg'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { auth } from "@/firebase/FirebaseConfig";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isLoggedIn = !!Cookies.get("user_token");

  const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  console.log('User data from localStorage:', userData)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    await auth.signOut();
    Cookies.remove("user");
    Cookies.remove("user_token");
    Cookies.remove("user_id");
    window.location.reload();
  }

  

  return (
    <div className="h-12 w-full bg-gray-900 shadow-sm sticky top-0 z-50 px-14 flex justify-between items-center">
      <div>
        <h1 className="text-white font-extrabold cursor-pointer flex items-center gap-2">
          <Link to="/">
            <span className="text-[#9333EA]">Fashion</span>Hub
          </Link>
        </h1>
      </div>

      {
        isLoggedIn
        ?(

      <div className="text-white relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <CgProfile className="text-xl text-gray-500" />
        </button>
        {isOpen && (
         <div className="absolute right-0 w-44 bg-white rounded-lg overflow-hidden shadow-xl z-10 cursor-pointer">
         <p className="px-4 py-2 text-sm font-semibold border-b flex items-center gap-2 text-[#E11D48]">
           <FaUserCheck className="text-base" /> {/* Adjusted icon size */}
           {userData?.name}
         </p>
         <p className="px-4 py-2 text-[11px] text-gray-600 font-semibold hover:bg-gray-100 flex items-center gap-2">
           <MdOutlineMailOutline className="" /> {/* Adjusted icon size */}
           {userData?.email}
         </p>
         <p
           className="px-4 py-2 text-[11px] text-gray-600 font-semibold hover:bg-gray-100 flex items-center gap-2"
           onClick={handleLogout}
         >
           <RiLogoutCircleRLine className="text-[11px]" /> {/* Adjusted icon size */}
           Logout
         </p>
       </div>
        )}
      </div>
        ):
        (
          <div className="text-white relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <CgProfile className="text-xl text-gray-500" />
        </button>
        {isOpen && (
         <div className="absolute right-0 w-40 bg-white rounded-lg overflow-hidden shadow-xl z-10 cursor-pointer">
            <Link to="/login" className="px-4 py-2 text-sm text-gray-600  font-semibold border-b flex items-center gap-2">
            
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 text-[11px] text-gray-600 font-semibold hover:bg-gray-100 flex items-center gap-2">
              Register
            </Link>
          </div>
       
        )}
      </div>
        )
      }
    </div>
  )
}