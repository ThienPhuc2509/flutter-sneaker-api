import mongoose from "mongoose";
const { Schema } = mongoose;
import ProductSchema from "./product.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: [
      {
        username: { type: String, unique: true },
        phone: { type: String, unique: true },
        location: { type: String, unique: true },
      },
    ],
    cart: [
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
        size: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],
    favorite: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
