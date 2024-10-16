import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import SideBar from "./SideBar"


const Home = () => {
  return (
    <div className="flex bg-gray-50 shadow ">
  
   <SideBar />

    {/* Main Content */}
    <div className="flex-grow text-gray-800 ">
     <Navbar />

      {/* Main Content Section */}
        <main className="p-4 h-[90vh] overflow-y-auto bg-gray-50 shadow-sm">
          <Outlet />
        </main>
      
    </div>
  </div>
  )
}

export default Home
