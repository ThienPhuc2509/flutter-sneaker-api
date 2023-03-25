import Food from "../models/food.js";

export const createFood = async (req, res, next) => {
  const newFood = new Food(req.body);

  try {
    const savedFood = await newFood.save();

    res.status(200).json(savedFood);
  } catch (err) {
    next(err);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFood);
  } catch (err) {
    next(err);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      {
        isDelete: true,
      },
      { new: true }
    );
    res.status(200).json(updatedFood);
  } catch (err) {
    next(err);
  }
};

// get by id
export const getFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    res.status(200).json(food);
  } catch (err) {
    next(err);
  }
};

// get all
export const get = async (req, res, next) => {
  try {
    const food = await Food.find();
    res.status(200).json(food);
  } catch (err) {
    next(err);
  }
};