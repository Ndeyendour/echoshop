import React, { createContext, useState, useEffect, useContext } from 'react';

// Créer le UserContext
const UserContext = createContext();

// Hook personnalisé pour accéder au contexte UserContext
export const useUser = () => useContext(UserContext);

// Composant UserProvider pour fournir l'état de l'utilisateur
export const UserProvider = ({ children }) => {
  // État utilisateur avec une fonction de récupération initiale à partir de localStorage
  const [user, setUser] = useState(() => {
    // Lors du premier rendu, essayer de récupérer l'utilisateur du localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null; // Récupérer l'utilisateur ou null
  });

  // Fonction pour se connecter (mettre à jour l'utilisateur)
  const loginUser = (username) => {
    const userData = { username }; // Créer l'objet utilisateur
    setUser(userData); // Mettre à jour l'état
    localStorage.setItem('user', JSON.stringify(userData)); // Sauvegarder l'utilisateur dans localStorage
  };

  // Fonction pour se déconnecter (supprimer l'utilisateur)
  const logoutUser = () => {
    setUser(null); // Réinitialiser l'état de l'utilisateur
    localStorage.removeItem('user'); // Supprimer l'utilisateur du localStorage
  };

  // Utiliser useEffect pour synchroniser l'état avec le localStorage
  useEffect(() => {
    // Lorsque l'état de l'utilisateur change, mettre à jour le localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]); // L'effet se déclenche lorsque l'état `user` change

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
