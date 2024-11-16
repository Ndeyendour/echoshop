import React, { createContext, useState, useEffect } from 'react';

// Création du contexte des favoris
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    // L'état des favoris, initialisé à une liste vide
    const [favorites, setFavorites] = useState([]);

    // Charger les favoris depuis le localStorage lors du montage du composant
    useEffect(() => {
        try {
            // Récupérer les favoris depuis localStorage, ou une liste vide si rien n'est trouvé
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavorites(storedFavorites);
        } catch (error) {
            // En cas d'erreur (par exemple, JSON mal formé), loguer l'erreur et initialiser à une liste vide
            console.error('Erreur lors du chargement des favoris depuis localStorage:', error);
            setFavorites([]); // S'assurer que l'état est une liste vide en cas d'erreur
        }
    }, []); // Le tableau vide [] signifie que ce useEffect ne se déclenche qu'une fois lors du montage du composant

    // Mettre à jour le localStorage chaque fois que la liste des favoris change
    useEffect(() => {
        if (favorites.length > 0) {
            // Sauvegarder les favoris dans localStorage uniquement si la liste n'est pas vide
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]); // Ce useEffect se déclenche à chaque fois que `favorites` change

    // Fonction pour ajouter/enlever un produit des favoris
    const toggleFavorite = (product) => {
        if (isFavorite(product._id)) {
            // Si le produit est déjà un favori, on le retire
            setFavorites(favorites.filter(item => item._id !== product._id));
        } else {
            // Si le produit n'est pas un favori, on l'ajoute
            setFavorites([...favorites, product]);
        }
    };

    // Fonction pour vérifier si un produit est un favori
    const isFavorite = (id) => {
        return favorites.some(product => product._id === id);
    };

    // Retourne le context avec toutes les méthodes et états nécessaires
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, setFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
