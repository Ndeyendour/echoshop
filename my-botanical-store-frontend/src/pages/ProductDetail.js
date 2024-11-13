import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";

import Footer from "../components/Footer";
import { CartContext } from '../pages/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du produit');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!product) return <div>Aucun produit trouvé.</div>

  return (
    <Fragment>
      <div id="pageWrapper">
   
    
      <div className="container my-5">
        <div className="card mx-auto shadow-lg" style={{ maxWidth: "800px" }}>
          <div className="row no-gutters">
            <div className="col-md-6">
              <img src={product.imageUrl} alt={product.name} className="card-img" />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h2 className="card-title fw-bold mb-3">{product.title}</h2>
                <ul className="list-inline rating mb-3">
                  {[...Array(4)].map((_, i) => (
                    <li className="list-inline-item" key={i}><i className="fas fa-star"></i></li>
                  ))}
                  <li className="list-inline-item"><i className="far fa-star"></i></li>
                </ul>
                <h4 className="text-success mb-3">${product.price}</h4>
                <p className="card-text mb-4">{product.description}</p>
                <div className="mb-4">
                  <div className="input-group">
                    <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                    <input type="text" className="form-control text-center" value={quantity} readOnly style={{ maxWidth: "50px" }} />
                    <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                  </div>
                </div>
                <button 
                  className="btn btn-success btn-block"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </Fragment>
  );
};

export default ProductDetail;
