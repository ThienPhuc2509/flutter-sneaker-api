import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const populatedOrder = await newOrder.populate({
      path: "products.product",
      select: "title image price brand state",
    });

    const savedOrder = await populatedOrder.save();
    const userId = req.body.userId;
    await User.findByIdAndUpdate(userId, { cart: [] });

    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        isDelete: true,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const getUserOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id).populate({
      path: "products.product",
      select: "title image price brand state",
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: "products.product",
      select: "title image price brand state",
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(501).json(err);
  }
};
