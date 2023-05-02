import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  size: {
    type: Array,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Product", ProductSchema);
