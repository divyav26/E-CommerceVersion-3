import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { db, storage } from "@/firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  finalprice: number;
  stock: number;
  images: string[]; // Store URLs here
  discount?: number;
  brand?: string;
}

export default function Component() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "Men",
    price: 0,
    finalprice: 0,
    stock: 0,
    images: [], // This will hold URLs of uploaded images
    discount: 0,
    brand: "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]); // State to hold file objects
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files); // Keep the File objects
      setImageFiles(fileArray); // Store the files separately
      console.log("Selected images:", fileArray);
    }
  };

  const uploadImages = async (files: FileList) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const storageRef = ref(storage, `products/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref); // Get download URL after upload
    });

    return Promise.all(uploadPromises); // Wait for all uploads to complete
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      if (imageFiles.length > 0) {
        const uploadedImages = await uploadImages(imageFiles as unknown as FileList); // Upload images and get URLs
        console.log("Uploaded Images:", uploadedImages);

        // Save product with image URLs to Firestore
        await addDoc(collection(db, "products"), {
          ...formData,
          images: uploadedImages, // Use the uploaded URLs here
        });

        setSubmitSuccess(true);
        setFormData({
          name: "",
          description: "",
          category: "Men",
          price: 0,
          finalprice: 0,
          stock: 0,
          images: [], // Reset images
          discount: 0,
          brand: "",
        });
        setImageFiles([]); // Clear image files after submission
      } else {
        throw new Error("Please upload at least one image.");
      }
    } catch (error) {
      setSubmitError("Error adding product. Please try again.");
      console.error("Error adding product: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl p-6 space-y-2">
      <h2 className="text-sm font-bold">Add Product Here!!!</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label htmlFor="images">Images</Label>
          <Input
            id="images"
            name="images"
            type="file"
            onChange={handleImageChange}
            multiple
            className="file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleSelectChange(e.target.value, "category")}
            className="w-full border border-black rounded-md p-[2px]"
          >
            <option value="" disabled>Select category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewellery">Jewellery</option>
          </select>
        </div>

        {/* Price and Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              name="discount"
              type="number"
              value={formData.discount || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Final Price */}
        <div className="space-y-2">
          <Label htmlFor="finalprice">Final Price</Label>
          <Input
            id="finalprice"
            name="finalprice"
            type="number"
            value={formData.finalprice}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Alerts for Error and Success */}
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        {submitSuccess && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Product added successfully!</AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full hover:bg-[#a57ce9] hover:text-white bg-black text-white transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Product...
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </div>
  );
}
