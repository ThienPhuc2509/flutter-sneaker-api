import express from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  get,
  getUserOrder,
} from "../controllers/orderController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", createOrder);

// UPDATE
router.put("/:id", verifyAdmin, updateOrder);

// DELETE
router.put("/delete/:id", verifyAdmin, deleteOrder);

// GET
router.get("/find/:id", getUserOrder);

// GET ALL
router.get("/", get);

export default router;
