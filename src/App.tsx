import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Pages/register/Register'
import Login from './Pages/login/Login'
import AddProducts from './adminDashboard/addProducts/AddProducts'
import Home from './adminDashboard/home/Home'
import ProductDetails from './Pages/products/ProductDetails'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productsDetails" element={<ProductDetails />} />
      
          <Route path="/home" element={<Home />}>
          <Route path="addproducts" element={<AddProducts />} />
         
        </Route>
    </Routes>

    </BrowserRouter>

    
    </>
  )
}

export default App
