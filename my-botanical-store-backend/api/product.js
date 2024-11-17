// api/products.js
import express from 'express';
import mongoose from 'mongoose';
import Product from './models/Product';  // Modèle Mongoose pour les produits

// Définition du modèle de produit
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  });
const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default app;
