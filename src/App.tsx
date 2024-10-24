import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Pages/register/Register'
import Login from './Pages/login/Login'
import AddProducts from './adminDashboard/addProducts/AddProducts'
import Home from './adminDashboard/home/Home'
import ProductDetails from './Pages/products/ProductDetails'
import Dashboard from './adminDashboard/home/Dashboard'
import AllOrders from './adminDashboard/orders/AllOrders'
import ProductHome from './Pages/home/ProductHome'
import Cart from './Pages/products/Cart'
import Wishlist from './Pages/products/Wishlist'
import Protected from './protected/Protected'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/' element={<ProductHome />}/>
      <Route path="/productCategory/:categoryName" element={<ProductHome />} />
      <Route path="/productsDetails/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Protected Component={Cart} />} />
      <Route path="/wishlist" element={<Protected Component={Wishlist} />} />
      
        <Route path="/home" element={<Home />}>
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<AllOrders />} />
        </Route>
    </Routes>

    </BrowserRouter>

    
    </>
  )
}

export default App
