import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import productRoute from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
