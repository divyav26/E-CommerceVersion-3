import Layout from "@/Layout/Layout";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, setProducts } from "@/redux/slice/productSlice";
import { Link, useParams } from "react-router-dom";
import Slider from "./Slider";

const ProductHome = () => {
  const categoryName = useParams().categoryName; // Get category name from URL
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.products);
  const filteredProducts = useSelector((state: any) => state.product.filteredProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log('Products from Redux:', products);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const productDoc = await getDocs(collection(db, "products"));
      const productsData = productDoc.docs.map((doc: any) => ({
        id: doc.id,
       ...doc.data(),
      }));
      
      console.log("Fetched Products:", productsData);
      dispatch(setProducts(productsData));
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (categoryName) {
      dispatch(filterByCategory(categoryName)); // Filter products by category if categoryName is present
    } else {
      dispatch(filterByCategory("all")); // Show all products if no category is specified
    }
  }, [categoryName, dispatch]);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout>
      <Slider />
      <div className="grid md:grid-cols-4 gap-4 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
        {filteredProducts?.map((product: any) => (
      <Link to={`/productsDetails/${product?.id}`}>
          <div key={product?.id} className="border-[1px] border-gray-200 overflow-hidden rounded-lg">
            <div className=" flex justify-center py-2">
              {product?.images?.[0] && ( // Check if the first image exists
                <div className=" w-30 h-30 relative overflow-hidden ">
                  <img
                    src={product.images[0]} // Display only the first image
                    alt={`${product?.name} - Image 1`}
                    className="h-[120px] object-cover rounded-lg transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
            </div>
            <div className="p-4 text-center">
              <h2 className="font-medium text-sm">{product.name.slice(0,20)}</h2>
              <p className="text-xs text-gray-700 my-1">{product.description.slice(0,80)}</p>
              <p className="font-bold flex items-center justify-center gap-2 text-green-800">up to {product?.discount}% off</p>
              {/* <p><span className="text-sm mt-2">₹{product.finalprice}</span><span className="text-xs mr-1">M.R.P</span><span className="line-through text-xs">₹{product?.price}</span> </p> */}
            </div>
           
          </div>
      </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ProductHome;
