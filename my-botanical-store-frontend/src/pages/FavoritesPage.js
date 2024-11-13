import React, { Fragment, useContext,useState,useEffect } from "react";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { CartContext } from '../pages/CartContext';

import { FavoritesContext } from './FavoritesContext';
import Footer from "../components/Footer";

function FavoritesPage() {
    const { favorites ,isFavorite, setFavorites  } = useContext(FavoritesContext);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const { addToCart,removeFromCart } = useContext(CartContext);

    const toggleFavorite = (product) => {
        if (isFavorite(product._id)) {
            // Supprime le produit des favoris
            setFavorites(favorites.filter(item => item._id !== product._id));
        } else {
            // Ajoute le produit aux favoris
            setFavorites([...favorites, product]);
        }
    };
    

  
    // Charger les favoris depuis le contexte ou le localStorage au montage
    useEffect(() => {
      // Si le contexte contient déjà des favoris
      if (favorites.length > 0) {
        setFavoriteProducts(favorites);
      } else {
        // Si le contexte est vide, charger depuis le localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavoriteProducts(storedFavorites);
      }
    }, [favorites]);

  return (
    <Fragment>
      <div id="pageWrapper">
        <Header />
        <main>
          <section className="introBannerHolder d-flex w-100 bgCover" 
          style={{ backgroundImage: 'url("images/b-bg7.jpg")' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                  <h1 className="headingIV fwEbold playfair mb-4">My Cart</h1>
                  <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                    <li className="mr-sm-2 mr-1"><Link to="/">Home</Link></li>
                    <li className="mr-sm-2 mr-1">/</li>
                    <li className="mr-sm-2 mr-1"><Link to="/shop">Shop</Link></li>
                    <li className="mr-sm-2 mr-1">/</li>
                    <li className="active">My Cart</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <div className="cartHolder container pt-xl-21 pb-xl-24 py-lg-20 py-md-16 py-10">
            <div className="row">
              <div className="col-12 table-responsive mb-xl-22 mb-lg-20 mb-md-16 mb-10">
                <table className="table cartTable">
                  <thead>
                    <tr>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Product</th>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Price</th>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Add to card</th>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
  {favorites.length > 0 ? (
    favorites.map((product, index) => (
      <tr key={product._id}>
        <td className="align-middle">
          <div className="d-flex align-items-center">
            <img src={product.imageUrl} alt={product.name} className="img-fluid" style={{ width: '50px', height: '50px' }} />
            <span className="ml-3">{product.name}</span>
          </div>
        </td>
        <td className="align-middle">${product.price}</td>
        <td className="align-middle">
        <button
            className="btn btnTheme"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={() => addToCart(product)}
            >
            Add to Cart
            </button>

        </td>
        <td className="border-top-0 border-bottom px-0 py-6 text-center">
        <button className="btn btn-danger" onClick={() => toggleFavorite(product)}>
                                                        
                                                            ×
                                                        </button>
                        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center">
        Aucun favori pour l'instant
      </td>
    </tr>
  )}
</tbody>

                </table>
                
              </div>
            </div>
            
            <Link to="/product" className="view-cart-btn"style={{ width: '200px', height: '80px' }}>Continue Shopping</Link>

          </div>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default FavoritesPage;
