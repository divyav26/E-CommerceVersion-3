import Layout from "@/Layout/Layout";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slice/productSlice";
import { Link } from "react-router-dom";

const ProductHome = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.products);
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
      <div className="grid grid-cols-2 gap-6 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
        {products?.map((product: any) => (
      <Link to={`/productsDetails/${product?.id}`}>
          <div key={product?.id} className="card border rounded-lg overflow-hidden shadow-md">
            <div className="image-slider flex justify-center p-4">
              {product?.images?.[0] && ( // Check if the first image exists
                <div className="flex justify-center items-center w-20 h-20 relative">
                  <img
                    src={product.images[0]} // Display only the first image
                    alt={`${product?.name} - Image 1`}
                    className="rounded-t-lg"
                  />
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-md font-bold">Price: ₹{product.finalprice}</p>
              <p className="text-sm text-gray-500 line-through">₹{product?.price}</p>
              <p className="text-sm text-green-600">Discount: {product?.discount}%</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <p className="text-sm">Category: {product.category}</p>
              <p className="text-sm">Brand: {product.brand}</p>
            </div>
          </div>
      </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ProductHome;
