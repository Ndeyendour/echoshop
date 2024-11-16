import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Home from './pages/Home';
import Cart from './components/Cart';
import CheckoutPage from './components/CheckoutPage';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CartProvider from './pages/CartContext';
import { FavoritesProvider } from './pages/FavoritesContext';
import FavoritesPage from './pages/FavoritesPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './pages/UserContext';
import ThankYouPage from './components/ThankYouPage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // Future flags to opt-in to React Router v7 behavior
  const future = {
    v7_relativeSplatPath: true,  // Opt-in to the new splat behavior in v7
    v7_startTransition: true,    // Opt-in to the new transition behavior in v7
  };

  return (
    <CartProvider>
      <FavoritesProvider>
        <UserProvider>
          <div className="App">
            <Router future={future}> {/* Apply the future flag to Router */}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product' element={<ProductList />} />
                <Route path='/favoris' element={<FavoritesPage />} />
                <Route path='/cart' element={<Cart />} />
                {/* <Route path='/product/:id' element={<ProductDetail />} /> */}
                <Route path='/contact' element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
              </Routes>
            </Router>
          </div>
        </UserProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
