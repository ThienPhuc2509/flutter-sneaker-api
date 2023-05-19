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
    const page = req.query.page || 1; // Trang hiện tại, mặc định là 1
    const limit = 6; // Số lượng sản phẩm trên mỗi trang
    const count = await Product.countDocuments();

    // Tính toán skip (bỏ qua) và limit (giới hạn) cho aggregate pipeline
    const skip = (page - 1) * limit;

    // Tạo pipeline cho phương thức aggregate
    const pipeline = [
      // Sắp xếp ngẫu nhiên các sản phẩm
      { $sample: { size: count } },
      // Bỏ qua và giới hạn số lượng sản phẩm theo trang
      { $skip: skip },
      { $limit: limit },
    ];

    // Thực hiện aggregate query để lấy danh sách sản phẩm ngẫu nhiên và phân trang
    const randomProducts = await Product.aggregate(pipeline);

    res.status(200).json(randomProducts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi lấy danh sách sản phẩm ngẫu nhiên." });
  }
};
