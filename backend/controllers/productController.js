import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Ensure req.files exist and properly extract images
        const images = ["image1", "image2", "image3", "image4"]
            .map(field => req.files?.[field]?.[0])
            .filter(Boolean); // Remove undefined values

        // Upload images to Cloudinary
        const imagesUrl = await Promise.all(images.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
        }));

        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imagesUrl);

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Function for listing products
const listProducts = async (req, res) => {
  try {
      const products = await productModel.find({});
      res.json({ success: true, products });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

// Function for removing a product
const removeProduct = async (req, res) => {
  try {
      await productModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Product Removed" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};


// Function for fetching single product info
const singleProduct = async (req, res) => {
  try {
      const { productId } = req.body; // Correct object destructuring
      const product = await productModel.findById(productId);

      if (!product) {
          return res.json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, product });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};


export { addProduct, listProducts, removeProduct, singleProduct };

