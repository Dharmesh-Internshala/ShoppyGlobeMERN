import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      discountPercentage: {
        type: Number,
        default: 0,
      },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // user is no longer required
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
