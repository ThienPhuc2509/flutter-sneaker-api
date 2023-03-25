import mongoose from "mongoose";
const { Schema } = mongoose;

const FoodSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  price: {
    type: String,
  },
});

export default mongoose.model("Food", FoodSchema);