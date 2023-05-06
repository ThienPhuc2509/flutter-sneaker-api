import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  get,
} from "../controllers/categoryController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createCategory);

// UPDATE
router.put("/:id", verifyAdmin, updateCategory);

// DELETE
router.put("/delete/:id", verifyAdmin, deleteCategory);

// GET
router.get("/find/:id", getCategory);

// GET ALL
router.get("/", get);

export default router;
