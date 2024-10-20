import { FcGoogle } from "react-icons/fc";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/Layout/Layout";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/firebase/FirebaseConfig";
import { showErrorToast, showSuccessToast } from "@/commonComponents/CommanToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import LoginImg  from '../../assets/loginImg.jpeg'

function Login() {
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState(
    {
      email: '',
      password: '',
    }
  )
  const provider = new GoogleAuthProvider();
  const navigate= useNavigate();

  const handleuserData = (e:any) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userdata.email, userdata.password);
      const user = userCredential.user;
      console.log('User created:', user);
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data from Firestore:", userData);

        // Check if the user has the isAdmin field
        const isAdmin = userData.isAdmin === true;
        const name = userData.name || ''; // get name from firebase 
        navigate("/admin/dashboard/AdminDashboard");
        // console.log("Is Admin: ", isAdmin);

        // Store user data in cookies
        Cookies.set("user", JSON.stringify({name, email: user.email, isAdmin }));
        console.log("User data stored in cookies");

        // Get user token
        const userToken = await user.getIdToken();
        console.log("User token:", userToken);
        Cookies.set("user_token", userToken);
        Cookies.set("user_id", user.uid);

        // Navigate based on user role
        if (isAdmin) {
          // console.log("Navigating to /admin/dashboard");
          navigate("/home");
          showSuccessToast('Login successful!');
        }
        else {
          // console.log("Navigating to /");
          navigate("/");
          showSuccessToast('Login successful!');
        }
      }
      else {
        console.error("User document not found in Firestore.");
        throw new Error("User data not found.");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      showErrorToast(`Login failed. ${error.message}`);
    }
    finally {
			setLoading(false);
		}
  };
    

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
  
      // Get user info from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
  
      if (!userSnapshot.exists()) {
        // Create a new user if not found
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          isAdmin: false, // Default value
          createdAt: new Date(), // Timestamp of creation
        });
        console.log('User data stored in Firestore');
      }
      Cookies.set("user", JSON.stringify({name: user.displayName, email: user.email }));
      
      // Get the user's token and store it in cookies
      const userToken = await user.getIdToken();
      Cookies.set("user_token", userToken);
      Cookies.set("user_id", user.uid);
  
      // Navigate based on user role
      navigate("/");
      showSuccessToast('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      showErrorToast('Something went wrong, please try again later.');
    }
  };
  

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <Layout>
    <div className="flex items-center md:min-h-screen p-6 bg-gray-50 border-4  ">
      <div className="flex-1 max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full "
              src={LoginImg }
              alt="Office"
            />
          </div>
          <main className="full flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700">Login!!</h1>
              <Label>
                <span className="text-xs">Email</span>
                <Input className="mt-1 text-xs text-gray-600" name="email" type="email" placeholder="john@doe.com" value={userdata.email} onChange={handleuserData} />
              </Label>

              <Label className="mt-6">
                <span className="text-xs">Password</span>
                <Input className="mt-1 text-xs text-gray-600" name="password" type="password" placeholder="***************" value={userdata.password} onChange={handleuserData} />
              </Label>

              <Button className="mt-6 w-full bg-[#9333ea] text-white hover:text-white hover:bg-black rounded-sm transition-all duration-300" 
              onClick={handleSubmit}
              >
                Log in
              </Button>

              <hr className="my-4" />

              <div className="w-full cursor-pointer hover:bg-gray-900 hover:text-white transition-all duration-300 flex justify-center items-center gap-2 border border-black rounded-xl p-1"
              onClick={handleGoogleLogin}
              >
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