import Product from "../Model/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create a product
export const createProduct = async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };


// GET /users - Fetch all users
export const getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(201).json({
      success: true,
      message: "Product fetch successfully",
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

  
  
  // Get a single product by ID
  export const getProductById = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  // Get all products in a category
  export const getProductsByCategory = async (req, res, next) => {
    try {
      const products = await Product.find({ category: req.params.categoryName });
      if (!products) {
        return next(new ErrorHandler("No products found in this category", 404));
      }
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  // Update product by ID
  export const updateProduct = async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  // Delete product by ID
  export const deleteProduct = async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  // Search for products
  export const searchProducts = async (req, res, next) => {
    try {
      const keyword = req.query.keyword
        ? {
            title: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};
      const products = await Product.find({ ...keyword });
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  // Bulk insert products
  export const insertBulkProducts = async (req, res, next) => {
    try {
      const products = await Product.insertMany(req.body.products);
      res.status(201).json({
        success: true,
        message: "Bulk products inserted successfully",
        data: products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };