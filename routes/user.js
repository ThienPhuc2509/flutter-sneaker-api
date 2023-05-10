import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  addToCart,
  removeFromCart,
  saveUserAddress,
  updateUserAddress,
  addToFavorite,
} from "../controllers/userController.js";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middleware/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

router.post("/add-to-cart/:id", addToCart);

router.delete("/remove-from-cart/:productId/:userId", removeFromCart);

router.post("/add-to-favorite/:id", addToFavorite);

router.post("/save-user-address/:id", saveUserAddress);

router.put("/update-user-address/:id/:addressId", updateUserAddress);



export default router;
