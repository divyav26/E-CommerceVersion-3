import { CiLocationOn } from "react-icons/ci"
import { FiPhone } from "react-icons/fi"
import { MdOutlineMail } from "react-icons/md"
import card1 from '../assets/card1.svg'



const Footer = () => {
  return (
    <>
    
    
    <div className="mt-8 bg-[#2C4152] pt-9">
  <div className="mx-auto w-full xl:px-0">
    <div className="grid md:grid-cols-5 gap-6 md:px-10">

      <div className="">
        <p className="text-xsfont-medium text-gray-300">
        <h1 className="text-gray-300 font-extrabold">
          <span className="text-gray-300">Fashion</span>Hub
        </h1>
        </p>
        <p className="mt-2 text-xs font-normal text-gray-300/[80%]">Buildings Alyssa,
          Begonia and Clover situated in Embassy Tech Village,
          Outer Ring Road,
          Devarabeesanahalli Village,
          Varthur Hobli,
          Mumbai – 400101, India</p>
        
      </div>

      <div className="text-gray-300">
          <p className="text-deutziawhite font-inter text-[18px] font-medium leading-normal">Products</p>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
                >Smart men’s clothing </p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >Trendy women’s clothing</p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
                >Fashionable footwear </p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >Stylish accessories </p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >Beauty begins here </p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >Fun and frolic </p></div>
        
        </div>

      <div className="text-gray-300">
      <p className="text-deutziawhite font-inter text-lg font-medium leading-normal">Address</p>
        <div className="flex gap-2 items-center my-2">
          <div className="flex items-center justify-center rounded-[75%]">
          <FiPhone className="text-gray-300 w-3 h-3" />
          </div>
          <div className="">
            <p className="font-Inter text-xs  text-gray-300">+91 1800123444</p>
            <p className="font-Inter text-xs text-gray-300">Support Number</p>
          </div>
        </div>
        <div className="flex gap-2 items-center my-2">
          <div className="flex items-center justify-center rounded-[75%]">
          <MdOutlineMail className="text-gray-300 w-3 h-3" />
          </div>
          <div className="">
            <p className="font-Inter text-xs  text-gray-300">help@lorem.com</p>
            <p className="font-Inter text-xs text-gray-300">Support Email</p>
          </div>
        </div>
        <div className="flex gap-2 items-center my-2">
          <div className="flex items-center justify-center rounded-[75%]">
          <CiLocationOn className="text-gray-300 w-3 h-3" />
          </div>
          <div className="">
            <p className="font-Inter text-xs  text-gray-300">Sub Nerul, Mumbia,
              India, 123456</p>
            <p className="font-Inter text-xs text-gray-300">Address</p>
          </div>
        </div>
      </div>
      
        <div className="text-gray-300">
          <p className="text-deutziawhite font-inter text-[18px] font-medium leading-normal">Contents</p>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
                >Home</p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >News</p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
                >Contact</p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >Plans and pricing</p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >Terms and conditions</p></div>
            <div className="mt-1"><p
                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-xs font-normal hover:font-semibold"
               >Privcay podivcy</p></div>
        
        </div>

        <div className="text-gray-300">
        <p className="text-xs font-bold tracking-wide">COMPANY IS ALSO AVAILABLE ON</p>
            <div className="flex items-center gap-1 px-2">
                <a href="#" className="w-full min-w-xl">
                    <img src="https://mcqmate.com/public/images/icons/playstore.svg" alt="Playstore Button"
                        className="h-10"/>
                </a>
                <a className="w-full min-w-xl" href="https://www.youtube.com/channel/UCo8tEi6SrGFP8XG9O0ljFgA">
                    <img src="https://mcqmate.com/public/images/icons/youtube.svg" alt="Youtube Button"
                        className="h-28"/>
                </a>
            </div>
            <p className="text-xs font-bold tracking-wide">Contacts</p>
            <div className="flex text-xs">
                <p className="mr-1">Email:</p>
                <a href="#" title="send email">admin@company.com</a>
            </div>
        </div>
    </div>

    <hr className="mt-[30px] text-gray-300" />

    <div className="md:flex items-center justify-between px-2 pb-8 pt-[9px] md:py-8">
      <p className="text-[10px] font-normal text-gray-300 md:text-[12px]">
        © Copyright
          2024
         All Rights Reserved by YOUR WEBSITES. PVT. LTD
      </p>
      <div className=" flex gap-4">
          <img src={card1} alt="cart" className="w-[400px] h-10" />
        </div>
    </div>
  </div>
    </div>
    </>
  )
}

export default Footer
