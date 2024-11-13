import React, { createContext, useState, useEffect, useContext } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

// UserProvider component to provide user state
export const UserProvider = ({ children }) => {
  // Check `localStorage` for user data on initial load
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to set user data when logged in
  const loginUser = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
  };

  // Function to clear user data when logged out
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
