import User from "../Model/usermodel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";
import dotenv from "dotenv"

dotenv.config();

// Register User
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return next(new ErrorHandler("User already exists", 400));

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json(successResponse("User registered successfully", "token", token));
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) return next(new ErrorHandler("Invalid email or password", 401));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json(successResponse("Logged in successfully", "token", token));
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
