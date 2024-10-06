import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { db } from "@/firebase/FirebaseConfig"
import { addDoc, collection } from "firebase/firestore"

interface ProductFormData {
  name: string
  description: string
  category: string
  price: number
  finalprice: number
  stock: number
  images: string[]
  discount?: number
  brand?: string
  sizes?: string[]
  colors?: string[] 
}

export default function Component() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "Men",
    price: 0,
    finalprice: 0,
    stock: 0,
    images: [],
    discount: 0,
    brand: "",
    sizes: [],
    colors: [], // Initial empty array for colors
  })
  const [isSubmitting, setIsSubmitting] =useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log("files img----", files)
    if (files) {
      const fileArray = Array.from(files).map(file => URL.createObjectURL(file))
      setFormData({ ...formData, images: fileArray })
      console.log("fileArray img----", fileArray)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    try {
        // Add the product to Firestore
        await addDoc(collection(db, "products"), formData)
        setSubmitSuccess(true)
        setFormData({
          name: "",
          description: "",
          category: "",
          price: 0,
          finalprice: 0,
          stock: 0,
          images: [],
          discount: 0,
          brand: "",
          sizes: [],
          colors: [], // Initial empty array for colors
        })
      } catch (error) {
        setSubmitError("Error adding product. Please try again.")
        console.error("Error adding product: ", error)
      } finally {
        setIsSubmitting(false)
      }
  }

  return (
    <div className="max-w-3xl p-6 space-y-2">
      <div className="">
        <h2 className="text-sm font-bold ">Add Product Here!!!</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
   
          {/* Product Name */}
          <div className="">
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
            
            {/* Product Category */}
   

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
          <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              name="images"
              type="file"
              onChange={handleImageChange}
              multiple
              className="file:mr-4  file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

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

       
          </div>

          {/* Sizes and Colors */}
          <div className="grid grid-cols-2 gap-4">
            {/* Sizes */}
            <div className="space-y-2">
              <Label htmlFor="sizes">Sizes</Label>
              <Input
                id="sizes"
                name="sizes"
                value={formData.sizes?.join(", ") || ""}
                onChange={(e) =>
                  setFormData({ ...formData, sizes: e.target.value.split(",").map((size) => size.trim()) })
                }
              />
            </div>
            
            {/* Colors */}
            <div className="space-y-2">
              <Label htmlFor="colors">Colors</Label>
              <Input
                id="colors"
                name="colors"
                value={formData.colors?.join(", ") || ""}
                onChange={(e) =>
                  setFormData({ ...formData, colors: e.target.value.split(",").map((color) => color.trim()) })
                }
              />
            </div>
          </div>

   
          <div className="grid grid-cols-3 gap-4">
           
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
              <Label htmlFor="discount">Discount </Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount || ""}
                onChange={handleInputChange}
              />
            </div>
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
            
          </div>
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
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
  )
}
