import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: Array,
  },
  size: {
    type: Array,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
    default: "",
  },
  price: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Product", ProductSchema);
