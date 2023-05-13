import mongoose from "mongoose";
const { Schema } = mongoose;

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
        },
        size: {
          type: Number,
          default: 0,
        },
      },
    ],
    favorite: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        isFavorite: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
