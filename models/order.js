import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
