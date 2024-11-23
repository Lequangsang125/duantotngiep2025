import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import { handelImageUppload } from "../../controllers/admin/products_controllers.js"; 
import { addProduct,getProducts,getProductById,deleteProduct,updateProduct } from "../../controllers/admin/products_controllers.js";
const router = express.Router();
router.post("/uppload-image" ,upload.single("my_file"),handelImageUppload)
router.post("/add",addProduct)
router.put("/edit/:id",updateProduct)
router.delete("/delete/:id",deleteProduct)
router.get("/get",getProducts)
export { router };