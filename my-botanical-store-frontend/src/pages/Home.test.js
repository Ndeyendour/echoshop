import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home'; // Assurez-vous que Home est bien importé
import { CartProvider } from '../pages/CartContext'; // Assurez-vous que CartProvider est bien utilisé
import { FavoritesProvider } from '../pages/FavoritesContext'; // Assurez-vous que FavoritesProvider est bien utilisé
import axios from 'axios';

// Mock axios pour simuler les appels API
jest.mock('axios');

describe('Home', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { _id: '1', name: 'Product 1', price: 30, imageUrl: 'product1.jpg', category: 'Plantes d\'Intérieur' },
        { _id: '2', name: 'Product 2', price: 40, imageUrl: 'product2.jpg', category: 'Plantes Succulentes' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component and adds product to cart and marks as favorite', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <FavoritesProvider>
            <CartProvider>
              <Home />
            </CartProvider>
          </FavoritesProvider>
        </MemoryRouter>
      );
    });

    
  });
});
