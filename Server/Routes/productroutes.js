import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  searchProducts,
  insertBulkProducts,
} from "../Controller/product.controller.js";

const router = express.Router();

// Create a new product
router.post("/products", createProduct);

router.get("/products", getProducts);
// Get products by category
router.get("/products/category/:categoryName", getProductsByCategory);

// Get a single product by ID
router.get("/products/:id", getProductById);

// Update a product by ID
router.put("/products/:id", updateProduct);

// Delete a product by ID 
router.delete("/products/:id", deleteProduct);

// Search for products
router.get("/products/search", searchProducts);

// Insert bulk products
router.post("/products/bulk", insertBulkProducts);

export default router;
