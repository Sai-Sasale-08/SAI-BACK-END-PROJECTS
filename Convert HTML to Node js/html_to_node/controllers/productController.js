const mongoose = require('mongoose');
const Product = require('../models/product');
exports.addProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const product = new Product({ name, price, description, imageUrl });
    await product.save();
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error adding product');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getEditProductForm = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send('Invalid product ID');
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/edit-product', { product });  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).send('Server error. Please try again later.');
  }
};


exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, description, imageUrl } = req.body;
  try {
    await Product.findByIdAndUpdate(productId, { name, price, description, imageUrl });
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error updating product');
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.findByIdAndDelete(productId);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error deleting product');
  }
};
