import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    userId: { type: String, required: true },

    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Notification", NotificationSchema);
