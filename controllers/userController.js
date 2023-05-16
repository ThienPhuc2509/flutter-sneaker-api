import Product from "../models/product.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    let updatedData = {};

    if (req.body.username) {
      updatedData.username = req.body.username;
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedUser);
    console.log(updatedUser);
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
    const user = await User.findById(req.params.id)
      .populate({
        path: "cart.product",
        select: "title image price brand state",
      })
      .populate({
        path: "favorite.product",
        select: "title image price brand state",
      });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate({
        path: "cart.product",
        select: "title image price brand state",
      })
      .populate({
        path: "favorite.product",
        select: "title image price brand state",
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

    let user = await User.findById(req.params.id).populate({
      path: "cart.product",
      select: "title image price brand state",
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
    const product = await Product.findById(productId).select(
      "title image price"
    );
    let user = await User.findById(userId).populate({
      path: "cart.product",
      select: "title image price brand state",
    });

    const productIndex = user.cart.findIndex((item) =>
      item.product._id.equals(product._id)
    );
    if (productIndex !== -1) {
      if (user.cart[productIndex].quantity === 1) {
        user.cart = user.cart.filter(
          (item) => !item.product._id.equals(product._id)
        );
      } else {
        user.cart[productIndex].quantity -= 1;
      }
    }

    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const removeAllQuantityFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.params;
    const product = await Product.findById(productId).select(
      "title image price"
    );
    let user = await User.findById(userId).populate({
      path: "cart.product",
      select: "title image price brand state",
    });

    const productIndex = user.cart.findIndex((item) =>
      item.product._id.equals(product._id)
    );
    if (productIndex !== -1) {
      if (user.cart[productIndex].quantity > 0) {
        user.cart = user.cart.filter(
          (item) => !item.product._id.equals(product._id)
        );
      }
    }

    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const addToFavorite = async (req, res, next) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id).select("title image price");

    let user = await User.findById(req.params.id).populate({
      path: "favorite.product",
      select: "title image price brand state",
    });

    const productIndex = user.favorite.findIndex((item) =>
      item.product._id.equals(product._id)
    );

    if (productIndex !== -1) {
      user.favorite.splice(productIndex, 1);
    } else {
      user.favorite.push({ product, isFavorite: true });
    }

    user = await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const saveUserAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const newAddress = {
      username: req.body.username,
      phone: req.body.phone,
      location: req.body.location,
    };

    user.address.push(newAddress);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { username, phone, location } = req.body;

    const user = await User.findById(req.params.id);

    const address = user.address.find(
      (address) => address._id.toString() === addressId
    );

    if (!address) {
      return res.status(404).json({ msg: "Address not found" });
    }

    if (username) {
      address.username = username;
    }
    if (phone) {
      address.phone = phone;
    }
    if (location) {
      address.location = location;
    }

    await user.save();

    res.status(200).json(address);
  } catch (err) {
    next(err);
  }
};

export const deleteUserAddress = async (req, res, next) => {
  try {

    
  } catch (err) {
    next(err);
  }
};
