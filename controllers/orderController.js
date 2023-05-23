import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res, next) => {
  const selectedProducts = req.body.selectedProducts; // Danh sách các sản phẩm được chọn từ client
  const newOrder = new Order({
    total: req.body.total,
    shipping: req.body.shipping,
    userId: req.body.userId,
    products: selectedProducts,
  });
  try {
    const populatedOrder = await newOrder.populate({
      path: "products.product",
      select: "title image price brand state",
    });

    // Slice số lượng sản phẩm từ giỏ hàng của người dùng
    const userId = req.body.userId;
    const user = await User.findById(userId);

    const remainingProducts = user.cart.slice(selectedProducts.length);
    user.cart = remainingProducts;

    console.log(remainingProducts);
    await user.save();
    const savedOrder = await populatedOrder.save();

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
    const orders = await Order.find({ userId: req.params.id }).populate({
      path: "products.product",
      select: "title image price brand state",
    });
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
