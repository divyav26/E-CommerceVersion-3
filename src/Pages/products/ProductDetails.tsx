import { db } from "@/firebase/FirebaseConfig";
import Layout from "@/Layout/Layout";
import { setProducts } from "@/redux/slice/productSlice";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { LuIndianRupee } from "react-icons/lu";

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
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState<string | null>(null);

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
        dispatch(setProducts([productData]));
        setMainImage(productData.images[0]);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container px-4 py-4">
        <div className="md:flex md:justify-between gap-2">
          {products.map((product: any) => (
            <div key={product.id} className="w-full md:flex md:justify-between gap-2">
              {/* Small Screen Layout */}
              <div className="block md:hidden">
                {/* Main Image on Small Screens */}
                <div className="flex justify-center mb-4">
                  <img
                    src={mainImage || product.images[0]}
                    alt="Product"
                    className="w-[300px] h-[300px] object-cover"
                  />
                </div>

                {/* Thumbnails on Small Screens */}
                <div className="flex justify-center gap-4">
                  {product.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleThumbnailClick(image)}
                      className="w-14 h-14 border border-gray-200 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    />
                  ))}
                </div>
              </div>

              {/* Large Screen Layout */}
              <div className="hidden md:flex gap-8">
                {/* Thumbnails on Large Screens */}
                <div className="flex md:flex-col gap-4">
                  {product.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleThumbnailClick(image)}
                      className="w-20 h-20 border border-gray-200 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    />
                  ))}
                </div>

                {/* Main Image on Large Screens */}
                <div className="w-[400px] h-[80vh] flex justify-center items-center ">
                  <img
                    src={mainImage || product.images[0]}
                    alt="Product"
                    className="w-[250px] h-[250px] object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm">Brand {product.brand}</p>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl text-red-600 flex items-center gap-1">
                    -{product.discount}%
                  </span>
                  <span className="text-sm font-bold flex">
                    <LuIndianRupee className="text-xs mt-[2px]" />
                    {product.finalprice}
                  </span>
                </div>
                <p className="text-gray-500 text-xs flex items-center mb-2">
                  M.R.P
                  <LuIndianRupee className="line-through text-xs" />
                  <span className="line-through text-xs">{product.price}</span>
                </p>
                <p className="text-gray-700 mb-6 text-xs">{product.description}</p>

                <div className="mb-6 text-xs">
                  <h3 className="text-lg font-medium mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Industry-leading noise cancellation</li>
                    <li>30-hour battery life</li>
                    <li>Touch sensor controls</li>
                    <li>Speak-to-chat technology</li>
                  </ul>
                </div>

                <div className="flex gap-4 items-center">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2">
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2">
                    <GoHeart />
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
