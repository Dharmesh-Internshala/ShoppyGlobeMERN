import express from "express";
import { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from "../Controller/categorycontroller.js";

const router = express.Router();

// Create a new category
router.post("/category", createCategory);

// Get all categories
router.get("/category", getAllCategories);

// Get a category by ID
router.get("/category/:id", getCategoryById);

// Update a category by ID
router.put("/category/:id", updateCategory);

// Delete a category by ID
router.delete("/category/:id", deleteCategory);

export default router;
