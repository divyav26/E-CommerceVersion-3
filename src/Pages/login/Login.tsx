
// import { p } from 'react-router-dom' 

import { FcGoogle } from "react-icons/fc";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from "react-router-dom";
import Layout from "@/Layout/Layout";

function Login() {
  return (
    <Layout>
    <div className="flex items-center min-h-screen p-6 bg-gray-50  ">
      <div className="flex-1 max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full "
              src="https://windmill-dashboard-react.vercel.app/static/media/create-account-office-dark.d34c7b50.jpeg"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700">Login!!</h1>
              <Label>
                <span className="text-xs">Email</span>
                <Input className="mt-1 text-xs text-gray-600" type="email" placeholder="john@doe.com" />
              </Label>

              <Label className="mt-6">
                <span className="text-xs">Password</span>
                <Input className="mt-1 text-xs text-gray-600" type="password" placeholder="***************" />
              </Label>

              <Button className="mt-6 w-full bg-[#9333ea] text-white hover:text-white hover:bg-black rounded-sm transition-all duration-300" >
                Log in
              </Button>

              <hr className="my-4" />

              <div className="w-full cursor-pointer flex justify-center items-center gap-2 border border-black rounded-xl p-1">
                <FcGoogle className="w-4 h-4 mr-2" aria-hidden="true" />
                <p className="text-sm">Login with Google</p>
              </div>

              <div className="mt-4 flex justify-between items-center cursor-pointer">
                <Link to="/register"
                  className="text-xs font-medium text-purple-600 hover:underline"
                >
                  Create account if you don't have account ??
                </Link>
              </div>
              
            </div>
          </main>
        </div>
      </div>
    </div>
   
    </Layout>
  )
}

export default Login