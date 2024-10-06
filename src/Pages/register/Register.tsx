import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from "react-router-dom";
import Layout from '@/Layout/Layout';
const Register = () => {
  return (
    <Layout>

    <div className="flex items-center min-h-screen p-2 bg-gray-50 ">
      <div className="flex-1 max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-sm ">
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700">Create an account !!!</h1>
              <Label>
                <span className="text-xs">Email</span>
                <Input className="mt-1 text-xs text-gray-600" type="email" placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span className="text-xs">Password</span>
                <Input className="mt-1 text-xs text-gray-600" type="password" placeholder="***************" />
              </Label>

              <Label className="mt-4">
                <span className="text-xs">Confirm Password</span>
                <Input className="mt-1 text-xs text-gray-600" type="password" placeholder="***************" />
              </Label>

              <Button className="mt-4 w-full bg-[#9333ea] text-white hover:text-white hover:bg-black transition-all duration-300" >
                Register    
              </Button>

              <hr className="my-4" />

              <div className="mt-4 flex justify-between items-center cursor-pointer">
                <Link to="/login"
                  className="text-xs font-medium text-purple-600 hover:underline"
                
                >
                  Already have an account? Login
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

export default Register
