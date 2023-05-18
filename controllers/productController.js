import Product from "../models/product.js";

export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        isDelete: true,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// get by id
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// get all
export const get = async (req, res, next) => {
  const qNew = req.query.new;
  const qBrand = req.query.brand;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qBrand) {
      products = await Product.find({
        brand: {
          $in: [qBrand],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const randomProducts = async (req, res, next) => {
  try {
    // Lấy số lượng sản phẩm có sẵn trong cơ sở dữ liệu
    const count = await Product.countDocuments();

    // Tạo pipeline cho phương thức aggregate
    const pipeline = [
      // Sắp xếp ngẫu nhiên các sản phẩm
      { $sample: { size: count } },
    ];

    // Thực hiện aggregate query để lấy danh sách sản phẩm ngẫu nhiên
    const randomProducts = await Product.aggregate(pipeline);

    res.status(200).json(randomProducts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi lấy danh sách sản phẩm ngẫu nhiên." });
  }
};
