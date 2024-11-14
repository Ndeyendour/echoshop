import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);


// Configuration de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;
// Assurez-vous que cette ligne est présente pour servir les fichiers statiques
app.use('/assets', express.static('assets'));


// Middleware
app.use(cors({
  origin: 'https://echoshop-frontend.vercel.app'  // URL de votre frontend
}));app.use(bodyParser.json());

// Servir des fichiers statiques à partir du dossier 'assets'
app.use('/assets', express.static('assets'));

// Connexion à MongoDB sans options obsolètes
mongoose.connect('mongodb://localhost/mydb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Définition du modèle de produit
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// User Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid or expired' });
    req.user = user;
    next();
  });
};

// Example usage on a protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed' });
});

// Routes

// Récupérer tous les produits
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajouter un nouveau produit
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un produit
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Récupérer un produit par ID
app.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Supprimer un produit
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Rechercher des produits par nom
app.get('/products/search', async (req, res) => {
  try {
    const nameQuery = req.query.name;
    const products = await Product.find({ name: { $regex: nameQuery, $options: 'i' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/categories', async (req, res) => {
  try {
    const { category, name } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (name) filter.name = new RegExp(name, 'i');

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des produits." });
  }
});
app.get('/products/filter', async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    // Parse des valeurs minPrice et maxPrice
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Number.MAX_SAFE_INTEGER;

    // Filtrage des produits dans la plage de prix
    const products = await Product.find({
      price: { $gte: min, $lte: max }
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("Erreur lors du filtrage des produits par prix:", err);
    res.status(500).json({ message: "Erreur serveur lors du filtrage des produits." });
  }
});


app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de mon magasin !');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
