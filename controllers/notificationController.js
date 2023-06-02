import Notification from "../models/notification.js";

export const createNotification = async (req, res, next) => {
  const newNotification = new Notification(req.body);

  try {
    const savedNotification = await newNotification.save();

    res.status(200).json(savedNotification);
  } catch (err) {
    next(err);
  }
};

// get by id
export const getUserNotification = async (req, res, next) => {
  try {
    const notification = await Notification.find({ userId: req.params.id });
    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
};

export const getNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const notification = await Notification.find();
    res.status(200).json(notification);
  } catch (err) {
    res.status(501).json(err);
  }
};

export const deleteAllNotifications = async (req, res, next) => {
  try {
    await Notification.deleteMany();
    res.status(200).json({ message: "All notifications have been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    res.status(200).json({ message: "Notification has been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
};
