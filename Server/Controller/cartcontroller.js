import Cart from "../Model/cartmodel.js";
import Product from "../Model/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";

// Add a product to the cart
export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user_id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let cart = await Cart.findOne({ user: userId });
    
    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [{ productId, quantity, discountPercentage: product.discountPercentage }] });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, discountPercentage: product.discountPercentage });
      }
    }

    await cart.save();
    res.status(200).json(successResponse("Product added to cart", "cart", cart));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Update the quantity of a product in the cart
export const updateCartItem = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user_id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return next(new ErrorHandler("Cart not found", 404));

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) return next(new ErrorHandler("Product not in cart", 404));

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json(successResponse("Cart item updated", "cart", cart));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Remove a product from the cart
export const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user_id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return next(new ErrorHandler("Cart not found", 404));

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(successResponse("Product removed from cart", "cart", cart));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Fetch the cart for a logged-in user
export const getCart = async (req, res, next) => {
  const userId = req.user_id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.productId", "title price thumbnail discountPercentage");
    if (!cart) return next(new ErrorHandler("Cart is empty", 404));

    res.status(200).json(successResponse("Cart fetched successfully", "cart", cart));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
