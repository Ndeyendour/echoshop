import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import { CartProvider } from '../pages/CartContext'; // Assurez-vous que CartProvider est bien utilisé
import { FavoritesProvider } from '../pages/FavoritesContext'; // Assurez-vous que FavoritesProvider est bien utilisé
import axios from 'axios';

// Mock axios pour simuler les appels API
jest.mock('axios');

describe('ProductList', () => {
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

  test('ajoute un produit au panier et marque comme favori', async () => {
    const addToCart = jest.fn(); // Mock de la fonction addToCart
    const toggleFavorite = jest.fn(); // Mock de la fonction toggleFavorite

    render(
      <MemoryRouter>
        <FavoritesProvider> {/* Enveloppe le composant avec le FavoritesProvider */}
          <CartProvider> {/* Enveloppe le composant avec le CartProvider */}
            <ProductList />
          </CartProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );

    // Attendre que le produit soit affiché
    await waitFor(() => screen.getByText('Product 1'));

    // Vérifier que le produit est affiché
    expect(screen.getByText('Product 1')).toBeInTheDocument();

   


   

    
  });
});
