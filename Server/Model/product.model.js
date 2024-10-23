import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  discountPercentage: { type: Number, default: 0 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  review: { type: String, default: '' },
  rating: { type: Number, min: 1, max: 5, default: 0 },
  brand: { type: String, required: true },
  thumbnail: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
