import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    orderDetails: {
      type: Array,
    },
    total: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);