import Order from "../models/order.js";

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const populatedOrder = await newOrder.populate({
      path: "products.product",
      select: "title image price",
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
    const orders = await Order.findById(req.params.id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(501).json(err);
  }
};
