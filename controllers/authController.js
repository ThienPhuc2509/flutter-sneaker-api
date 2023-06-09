import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .populate({
        path: "cart.product",
        select: "title image price brand state",
      })
      .populate({
        path: "favorite.product",
        select: "title image price brand state size",
      });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    res.json({ ...user._doc, token });
  } catch (err) {
    next(err);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .populate({
        path: "cart.product",
        select: "title image price brand state",
      })
      .populate({
        path: "favorite.product",
        select: "title image price brand state size",
      });
    if (!user) return next(createError(404, "User not found!"));

    if (!user.isAdmin)
      return next(createError(404, "App is support only for employee"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    res.json({ ...user._doc, token });
  } catch (err) {
    next(err);
  }
};
