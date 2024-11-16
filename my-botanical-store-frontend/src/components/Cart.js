import React, { Fragment, useContext } from "react";
import Header from "./Header";
import { CartContext } from '../pages/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, updateQuantityInCart, removeFromCart } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantityInCart(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantityInCart(productId, currentQuantity - 1);
    }
  };

  return (
    <Fragment>
      <div id="pageWrapper">
        <Header />
        <main>
        <section
        className="introBannerHolder d-flex w-100 bgCover"
        style={{ backgroundImage: 'url("images/b-bg7.jpg")'}}
      >
            <div className="container">
              <div className="row">
                <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                  <h1 className="headingIV fwEbold playfair mb-4">Mon panier</h1>
                  <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                    <li className="mr-sm-2 mr-1"><Link to="/">Produit</Link></li>
                    <li className="mr-sm-2 mr-1">/</li>
                    <li className="active">Panier</li>
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
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Produit</th>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Prix</th>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Quantite</th>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Total</th>
                      <th scope="col" className="text-uppercase fwEbold border-top-0">Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product) => (
                      <tr key={product._id} className="align-items-center">
                        <td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
                          <div className="imgHolder">
                            <img src={product.imageUrl} alt="Product" className="img-fluid" style={{ width: '70px', height: '80px' }} />
                          </div>
                          <span className="title pl-2"><a href="shop-detail.html">{product.name}</a></span>
                        </td>
                        <td className="fwEbold border-top-0 border-bottom px-0 py-6">€{product.price}</td>
                        <td className="border-top-0 border-bottom px-0 py-6 d-flex align-items-center">
                          <button 
                            className="btn btn-light border" 
                            onClick={() => decreaseQuantity(product._id, product.quantity)}
                          >
                            -
                          </button>
                          <span className="px-3">{product.quantity}</span>
                          <button 
                            className="btn btn-light border" 
                            onClick={() => increaseQuantity(product._id, product.quantity)}
                          >
                            +
                          </button>
                        </td>
                        <td className="fwEbold border-top-0 border-bottom px-0 py-6">
                          €{(product.price * product.quantity).toFixed(2)}
                        </td>
                        <td className="border-top-0 border-bottom px-0 py-6 text-center">
						<button 
                                                            className="remove-item-btn"
                                                            onClick={() => removeFromCart(product._id)}
                                                        >
                                                            ×
                                                        </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="cart-total">
                  <p><strong>Total Prix:</strong> €{totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <Link to="/checkout" className="view-cart-btn"style={{ width: '200px', height: '80px' }}>Aller au checkout</Link>

          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default Cart;
