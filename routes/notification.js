import express from "express";
import {
  createNotification,
  getUserNotification,
  getNotification,
  get,
  deleteNotificationById,
  deleteAllNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/find/:id", getUserNotification);
router.get("/", get);
router.delete("/:id", deleteNotificationById);
router.delete("/", deleteAllNotifications);
export default router;
