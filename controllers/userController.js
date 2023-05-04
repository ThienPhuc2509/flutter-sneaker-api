import Product from "../models/product.js";
import User from "../models/user.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "cart.product",
      select: "title image price",
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({
      path: "cart.product",
      select: "title image price",
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const addToCart = async (req, res, next) => {
  try {
    const { id, size, quantity } = req.body;
    const product = await Product.findById(id).select("title image price");
    console.log(product);
    let user = await User.findById(req.params.id).populate({
      path: "cart.product",
      select: "title image price",
    });

    const productIndex = user.cart.findIndex(
      (item) => item.product._id.equals(product._id) && item.size === size
    );

    if (productIndex !== -1) {
      user.cart[productIndex].quantity += quantity;
      user.cart[productIndex].product = product;
    } else {
      user.cart.push({ product, quantity, size });
    }

    user = await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.params;
    const product = await Product.findById(productId);
    let user = await User.findById(userId);

    const productIndex = user.cart.findIndex((item) =>
      item.product._id.equals(product._id)
    );
    if (productIndex !== -1) {
      if (user.cart[productIndex].quantity == 1) {
        user.cart = user.cart.filter(
          (item) => !item.product._id.equals(product._id)
        );
      } else {
        user.cart[productIndex].quantity -= 1;
      }
    }

    user = await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const addToFavorite = async (req, res, next) => {};

export const removeFromFavorite = async (req, res, next) => {};
