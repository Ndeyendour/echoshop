import React, { Fragment, useContext, useState } from 'react';
import { FavoritesContext } from '../pages/FavoritesContext'; // Ajustez le chemin du contexte
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';




const CheckoutPage = () => {
    const { favorites } = useContext(FavoritesContext);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Calculer le total du panier
    const calculateTotal = () => {
        return favorites.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Exemple simple d'affichage des informations de commande
        console.log("Order details:", {
            favorites,
            shippingInfo,
            paymentMethod,
            total: calculateTotal()
        });

        // Redirige vers la page de remerciement
        navigate('/thank-you');
    };

    return (
        <Fragment>
        <div id="pageWrapper">
            <Header />
            <section
        className="introBannerHolder d-flex w-100 bgCover"
        style={{ backgroundImage: 'url("images/b-bg7.jpg")'}}
      >
            <div className="container">
              <div className="row">
                <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                  <h1 className="headingIV fwEbold playfair mb-4">Caisse</h1>
                  <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                    <li className="mr-sm-2 mr-1"><Link to="/">Produit</Link></li>
                    <li className="mr-sm-2 mr-1">/</li>
                    <li className="active">caisse</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <br />
          <br />
        <div className="checkout-container">
            <h1>Caisse</h1>

            {/* Résumé du panier */}
            <div className="cart-summary">
                <h2>Ton panier</h2>
                <ul>
                    {favorites.map(item => (
                        <li key={item._id}>
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                        </li>
                    ))}
                </ul>
                <div className="total">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                </div>
            </div>

            {/* Formulaire de livraison */}
            <form onSubmit={handleSubmit}>
                <h2>Informations de livraison</h2>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div>
                    <label>Addresse:</label>
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div>
                    <label>Ville:</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        required
                    />
                </div>

                {/* Méthode de paiement */}
                <div className="payment-methods">
                    <label>Methode de payment:</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Select payment method</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>

                {/* Bouton de soumission */}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
        <br/>
        <br />
        <Footer />
        </div>
        </Fragment>
    );
};

export default CheckoutPage;
