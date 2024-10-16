import { db } from "@/firebase/FirebaseConfig";
import Layout from "@/Layout/Layout"
import { setProducts } from "@/redux/slice/productSlice";
import {doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  quantity?: number;
  category?: string;
  brand?: string;
  discount?: number;
  finalprice?: number;
  stock?: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state: any) => state.product.products);
  console.log("Products:", products);
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    if (!id) {
      console.error("Product ID is undefined");
      return; 
    }
    
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const productData = docSnap.data() as Product;
        console.log("Product data:", productData);
        dispatch(setProducts([productData]));
        
        
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  };

  useEffect(() => {
    console.log("Fetching product with ID:", id);
    fetchProduct();
  }, [id]);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="">
    
    <div className="container px-4 py-8">
    <div className="flex justify-between gap-4">

     {
      products?.length > 0 && products?.map((product: any) => (
     <>
     
        <div className="flex flex-col gap-4">
         {product.images.map((image:any, index:any) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="size-14 sm:size-20 border border-gray-200 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  />
                ))}
        </div>
        <div>
          <img src={product?.images[0]} alt="Product"
             className="w-[400px] h-[350px] mb-4" id="mainImage"/>
        </div>

      <div className="w-full md:w-1/2 px-4">
        <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
        <p className="text-gray-600 mb-4">SKU: {product?.id}</p>
        <div className="mb-4">
          <span className="text-2xl font-bold mr-2">${product?.finalprice}</span>
          <span className="text-gray-500 line-through">{product?.price}</span>
        </div>
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
        </div>
        <p className="text-gray-700 mb-6">Experience premium sound quality and industry-leading noise cancellation
          with
          these wireless headphones. Perfect for music lovers and frequent travelers.</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Color:</h3>
          <div className="flex space-x-2">
            <button
                            className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
            <button
                            className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
            <button
                            className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
          </div>
        </div>

        <div className="mb-6">
          <label  className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min="1" value="1"
            className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        
                        Add to Cart
                    </button>
           <button
                        className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        Wishlist
                    </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Industry-leading noise cancellation</li>
            <li>30-hour battery life</li>
            <li>Touch sensor controls</li>
            <li>Speak-to-chat technology</li>
          </ul>
        </div>
      </div>
     </>
      ))
     }
      
   
    </div>
  </div>

  <script>

  </script>
</div>
    </Layout>
  )
}

export default ProductDetails
