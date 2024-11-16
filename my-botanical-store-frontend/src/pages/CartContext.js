import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    // Récupérer les données du panier à partir du `localStorage` au chargement initial
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        try {
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage", error);
            return [];
        }
    });

    // Utiliser `useEffect` pour sauvegarder le panier dans le `localStorage` à chaque mise à jour
    useEffect(() => {
        if (Array.isArray(cart)) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            console.warn("Cart is not an array", cart);
        }
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    const updateQuantityInCart = (productId, newQuantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantityInCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
