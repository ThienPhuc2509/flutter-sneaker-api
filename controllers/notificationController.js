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
