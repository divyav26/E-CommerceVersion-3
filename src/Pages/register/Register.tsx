import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from "react-router-dom";
import Layout from '@/Layout/Layout';
import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '@/commonComponents/CommanToast';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import LoginImg  from '../../assets/loginImg.jpeg'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match.');
      return;
    }

    try {
      //here we are creating user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user);

      // here we set user data as role using uid of user
      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        isAdmin: false, // Default value for isAdmin, change if needed
        createdAt: new Date(), // Store the timestamp of user creation
      });
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // console.log('User data stored in Firestore');
      showSuccessToast('Registration successfully completed!! Please login now.');
      
      
    } catch (error) {
      showErrorToast('Something went wrong please try again later.');
    }
  }



  return (
    <Layout>

    <div className="flex items-center md:min-h-screen p-2 bg-gray-50 ">
      <div className="flex-1 max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-sm ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full "
              src={LoginImg}
              alt="Office"
            />
          
          </div>
          <main className="full flex items-center justify-center p-4 md:w-1/2 my-2 ">
            <div className="w-full">
              <h1 className="mb-2 text-xl font-semibold text-gray-700">Create an account !!!</h1>
              <Label>
                <span className="text-xs">Name</span>
                <Input className="mt-1 text-xs text-gray-600" type="email" placeholder="example" value={name} onChange={(e) => setName(e.target.value)} />
              </Label>
              <Label>
                <span className="text-xs">Email</span>
                <Input className="mt-1 text-xs text-gray-600" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span className="text-xs">Password</span>
                <Input className="mt-1 text-xs text-gray-600" type="password" placeholder="***************" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span className="text-xs">Confirm Password</span>
                <Input className="mt-1 text-xs text-gray-600" type="password" placeholder="***************" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </Label>

              <Button className="mt-4 w-full bg-[#9333ea] text-white hover:text-white hover:bg-black transition-all duration-300" 
              onClick={handleSubmit}
              >
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
