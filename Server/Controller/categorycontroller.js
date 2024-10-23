import Category from "../Model/categorymodel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";

// Create a new category
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return next(new ErrorHandler("Category name is required", 400));
    }

    const category = await Category.create({ name, description });
    res.status(201).json(successResponse("Category created successfully", "category", category));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get all categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(successResponse("Categories fetched successfully", "categories", categories));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    res.status(200).json(successResponse("Category fetched successfully", "category", category));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Update category by ID
export const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return next(new ErrorHandler("Category not found", 404));
    }

    res.status(200).json(successResponse("Category updated successfully", "category", updatedCategory));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Delete category by ID
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    res.status(200).json(successResponse("Category deleted successfully"));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
