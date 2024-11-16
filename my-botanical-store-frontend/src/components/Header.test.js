import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { UserProvider, useUser } from '../pages/UserContext'; // Ajustez le chemin

// Composant de test qui utilise le UserContext
const TestComponent = () => {
  const { user, loginUser, logoutUser } = useUser();
  
  return (
    <div>
      <span>{user ? user.username : 'No user'}</span>
      <button onClick={() => loginUser('JohnDoe')}>Login</button>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

describe('UserContext', () => {
  beforeEach(() => {
    // Avant chaque test, vider le localStorage pour s'assurer que l'état est propre
    localStorage.clear();
  });

  it('should show no user initially', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByText('No user')).toBeInTheDocument();
  });

  it('should login the user and show the username', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('Login')); // Simuler le login
    expect(screen.getByText('JohnDoe')).toBeInTheDocument(); // Vérifier que le nom d'utilisateur apparaît
  });

  it('should logout the user and show no user', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('Login')); // Simuler le login
    fireEvent.click(screen.getByText('Logout')); // Simuler le logout
    expect(screen.getByText('No user')).toBeInTheDocument(); // Vérifier que "No user" est affiché après le logout
  });

  it('should persist user in localStorage', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('Login')); // Simuler le login
    const userInLocalStorage = localStorage.getItem('user');
    expect(userInLocalStorage).toBeTruthy();
    const parsedUser = JSON.parse(userInLocalStorage);
    expect(parsedUser.username).toBe('JohnDoe');
  });
});
