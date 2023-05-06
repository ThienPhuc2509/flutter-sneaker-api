import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  get,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", createProduct);

// UPDATE
router.put("/:id", verifyAdmin, updateProduct);

// DELETE
router.put("/delete/:id", verifyAdmin, deleteProduct);

// GET
router.get("/find/:id", getProduct);

// GET ALL
router.get("/", get);

export default router;
