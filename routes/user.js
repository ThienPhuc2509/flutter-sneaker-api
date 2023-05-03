import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  addToCart,
  removeFromCart,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", getUsers);

router.post("/add-to-cart/:id", addToCart);

router.delete("/remove-from-cart/:productId/:userId", removeFromCart);

export default router;
