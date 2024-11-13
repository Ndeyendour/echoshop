import React, { useState } from 'react';
import { Link } from "react-router-dom";

function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid green', borderRadius: '20px', overflow: 'hidden' }}>
        <button onClick={handleDecrease} style={buttonStyle}>-</button>
        <span style={quantityStyle}>{quantity}</span>
        <button onClick={handleIncrease} style={buttonStyle}>+</button>
      </div>
      <button style={addToCartButtonStyle}>Add To Cart ➔</button>
    </div>
  );
}

const buttonStyle = {
  border: 'none',
  backgroundColor: 'white',
  padding: '5px 10px',
  color: 'green',
  fontSize: '18px',
  cursor: 'pointer',
};

const quantityStyle = {
  padding: '0 15px',
  fontSize: '18px',
};

const addToCartButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default AddToCart;
