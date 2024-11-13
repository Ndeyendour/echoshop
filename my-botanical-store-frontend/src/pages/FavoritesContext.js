import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Charger les favoris depuis le localStorage au montage du composant
    useEffect(() => {
        try {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavorites(storedFavorites);
        } catch (error) {
            console.error('Erreur lors du chargement des favoris depuis localStorage', error);
            setFavorites([]);  // S'assurer que l'état est initialisé à une liste vide si une erreur survient
        }
    }, []);

    // Mettre à jour le localStorage à chaque changement de la liste des favoris
    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    const toggleFavorite = (product) => {
        if (isFavorite(product._id)) {
            const updatedFavorites = favorites.filter(item => item._id !== product._id);
            setFavorites(updatedFavorites);
        } else {
            const updatedFavorites = [...favorites, product];
            setFavorites(updatedFavorites);
        }
    };

    const isFavorite = (id) => {
        return favorites.some(product => product._id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, setFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
