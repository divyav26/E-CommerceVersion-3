
import { Link } from "react-router-dom"
import { RxDashboard } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiFileHistoryFill } from "react-icons/ri";
const SideBar = () => {
  return (
    <div>
       <div>
      <aside className="hidden sm:flex sm:flex-col w-[170px] h-[100vh] shadow  sticky left-0">
      
      <div className="flex-grow flex flex-col justify-between text-gray-500 bg-white text-sm">
        <nav className="flex flex-col mx-4 mt-2 space-y-4">
          <div className="text-lg flex items-center gap-1">
          <h1 className="text-black font-extrabold cursor-pointer flex items-center gap-2">
          <Link to="/home">
            <span className="text-rose-600">Fashion</span>Hub
          </Link>
        </h1>
          </div>
          <Link to="dashboard" className="flex  items-center gap-2"><RxDashboard />Dashboard</Link>
          <Link to="addproducts" className="flex  items-center gap-2"><IoIosAddCircleOutline />Add Product</Link>
          <Link to="orders" className="flex  items-center gap-2"><RiFileHistoryFill />
            All orders
          </Link>
          
        </nav>
       
      </div>
    
    </aside>
    </div>
    </div>
  )
}

export default SideBar
