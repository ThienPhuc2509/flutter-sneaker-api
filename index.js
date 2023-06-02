import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import orderRoute from "./routes/order.js";
import notificationRoute from "./routes/notification.js";
import stripeRoute from "./routes/stripe.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

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
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/stripe", stripeRoute);

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // console.log(req);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log(req);
    return res.status(200).json(req.file.filename);
  } catch (error) {
    console.error(error);
  }
});
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Example app listening on port ${process.env.PORT}`);
});
