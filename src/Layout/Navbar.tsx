import { PiUserCircleFill } from "react-icons/pi";
import { BsCart3 } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsHeart } from "react-icons/bs";
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { auth } from "@/firebase/FirebaseConfig";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, SearchProduct } from "@/redux/slice/productSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isLoggedIn = !!Cookies.get("user_token");
  const selectedCategory = useSelector((state: any) => state.product.selectedCategory);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  console.log('User data from localStorage:', userData)


  const categories = [ "MEN", "WOMEN", "ELECTRONICS", "JEWELLERY", "BEAUTY"];

  const handleCategoryClick = (category: string) => {
    dispatch(filterByCategory(category)); // Dispatch Redux action
    navigate(`/productCategory/${category.toLowerCase() === "All" ? "/" : category.toLowerCase()}`); // Navigate to the category route
  };

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

  const handleSearchProduct = (e:any)=>{
    dispatch(SearchProduct(e.target.value));
  }

  const handleLogout = async () => {
    await auth.signOut();
    Cookies.remove("user");
    Cookies.remove("user_token");
    Cookies.remove("user_id");
    window.location.reload();
  }

  

  return (
    <div className="h-12  w-full bg-white shadow-md sticky top-0 z-50 px-10 flex justify-between items-center">
      <div className="flex items-center gap-6">
      <Link to="/" className="relative text-xl font-semibold text-gray-700">
        <span className="tracking-widest">FashionHub</span>
        
      </Link>

      
     

        <div className="hidden md:flex gap-4 text-sm font-light text-gray-900 cursor-pointer">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`${
              selectedCategory.toLowerCase() === category.toLowerCase() ? "text-pink-400" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      </div>

      
    <div className="flex items-center gap-2">

      <div>
      <Input
        type="text"
        placeholder="Search for products..."
        onChange={handleSearchProduct}
        className="w-[100%] px-2 py-2 mr-20 bg-white rounded-2xl text-xs text-gray-900"
      />
      </div>

        <div className="flex items-center gap-3">

                {/* if login h it show dropdowun with name  */}
        <Link to="/cart" className="text-gray-900 text-xl cursor-pointer"><BsCart3 /></Link>
              {
                isLoggedIn
                ?(
                  <>
                  <Link to="/wishlist" className="text-gray-900 text-xl cursor-pointer">
                <BsHeart className="text-xl" />
              </Link>
              <div className="text-white mt-1 relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="focus:outline-none"
                >
                  <PiUserCircleFill className="text-2xl font-light text-gray-900" />
                </button>
                {isOpen && (
                <div className="absolute right-0 w-44 bg-white rounded-lg overflow-hidden shadow-xl z-10 cursor-pointer">
                <p className="px-4 py-2 text-sm font-semibold border-b flex items-center gap-2 text-[#E11D48]">
                  <FaUserCheck className="text-base" /> {/* Adjusted icon size */}
                  {userData?.name}
                </p>
                <p className="px-4 py-2 text-[11px] text-gray-900 font-semibold hover:bg-gray-100 flex items-center gap-2">
                  <MdOutlineMailOutline className="" /> {/* Adjusted icon size */}
                  {userData?.email}
                </p>
                <p
                  className="px-4 py-2 text-[11px] text-gray-900 font-semibold hover:bg-gray-100 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <RiLogoutCircleRLine className="text-[11px]" /> {/* Adjusted icon size */}
                  Logout
                </p>
              </div>
                )}
              </div>
              
                  </>
                ):
                //it show login if not login 
                (
                  <>

                  <div className="text-white mt-1 relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="focus:outline-none"
                >
                  <PiUserCircleFill className="text-2xl font-light text-gray-900" />
                </button>
                
                {isOpen && (

                <div className="absolute top-7 right-0 w-40 bg-white rounded-lg overflow-hidden shadow-xl z-10 cursor-pointer">
                    <Link to="/login" className="px-4 py-2 text-sm text-gray-900  font-semibold border-b flex items-center gap-2">
                    
                      Login
                    </Link>
                    <Link to="/register" className="px-4 py-2 text-[11px] text-gray-900 font-semibold hover:bg-gray-100 flex items-center gap-2">
                      Register
                    </Link>
                    
                  </div>
              
                )}
                  </div>
                  </>
                )
              }
        </div>
    </div>
    </div>
  )
}