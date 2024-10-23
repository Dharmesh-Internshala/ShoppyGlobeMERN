import express from "express";
import { addToCart, updateCartItem, removeFromCart, getCart } from "../Controller/cartcontroller.js";
import { isAuthenticatedUser } from "../middleware/authMiddleware.js";


const router = express.Router();

// Add a product to the cart
router.post("/cart", isAuthenticatedUser, addToCart);

// Update cart item quantity
router.put("/cart", isAuthenticatedUser, updateCartItem);

// Remove a product from the cart
router.delete("/cart", isAuthenticatedUser, removeFromCart);

// Get the cart for the logged-in user
router.get("/cart", isAuthenticatedUser, getCart);

export default router;
