import express from "express";
import {
  createFood,
  updateFood,
  deleteFood,
  getFood,
  get,
} from "../controller/foodController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createFood);

// UPDATE
router.put("/:id", verifyAdmin, updateFood);

// DELETE
router.put("/delete/:id", verifyAdmin, deleteFood);

// GET
router.get("/find/:id", getFood);

// GET ALL
router.get("/", get);

export default router;