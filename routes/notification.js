import express from "express";
import {
  createNotification,
  getUserNotification,
  getNotification,
  get,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/find/:id", getUserNotification);
router.get("/", get);

export default router;
