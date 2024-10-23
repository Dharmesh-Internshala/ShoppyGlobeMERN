import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticatedUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorHandler("Authorization header missing or incorrect", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};
