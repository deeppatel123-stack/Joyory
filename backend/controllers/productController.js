import { Product } from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      brand,
      skinType,
      concern,
      texture,
      finish,
      minPrice,
      maxPrice,
      isFeatured,
      isBestSeller,
      isNewArrival,
      sort,
      page = 1,
      limit = 50
    } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (brand && brand !== "All") {
      query.brand = { $regex: new RegExp(`^${brand}$`, "i") };
    }

    if (skinType && skinType !== "All") {
      query.skinTypes = { $in: [new RegExp(skinType, "i")] };
    }

    if (concern && concern !== "All") {
      query.concerns = { $in: [new RegExp(concern, "i")] };
    }

    if (texture && texture !== "All") {
      query.texture = { $regex: new RegExp(texture, "i") };
    }

    if (finish && finish !== "All") {
      query.finish = { $regex: new RegExp(finish, "i") };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (isFeatured === "true") query.isFeatured = true;
    if (isBestSeller === "true") query.isBestSeller = true;
    if (isNewArrival === "true") query.isNewArrival = true;

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "price-asc" || sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price-desc" || sort === "price_desc") sortOption = { price: -1 };
    else if (sort === "rating") sortOption = { rating: -1 };
    else if (sort === "newest") sortOption = { createdAt: -1 };
    else if (sort === "popular") sortOption = { reviewCount: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortOption).skip(skip).limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ $or: [{ sku: id }, { name: { $regex: new RegExp(`^${id}$`, "i") } }] });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, brand, category, price, mrp, images, description, stock } = req.body;

    if (!name || !brand || !category || !price || !mrp) {
      return res.status(400).json({ success: false, message: "Name, brand, category, price, and MRP are required." });
    }

    if (price < 0 || mrp < 0 || (stock !== undefined && stock < 0)) {
      return res.status(400).json({ success: false, message: "Prices and stock cannot be negative numbers." });
    }

    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    const product = await Product.create({
      ...req.body,
      discount: req.body.discount || discount
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    if (req.body.price && req.body.mrp) {
      req.body.discount = Math.round(((req.body.mrp - req.body.price) / req.body.mrp) * 100);
    }

    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product removed from catalog."
    });
  } catch (error) {
    next(error);
  }
};
