import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    // subtotal: { type: Number, required: true }, // phí ship
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
