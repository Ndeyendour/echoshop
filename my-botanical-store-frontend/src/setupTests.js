// jest-dom ajoute des matchers personnalisés pour Jest pour effectuer des assertions sur les nœuds DOM.
// Cela te permet de faire des choses comme:
// expect(element).toHaveTextContent(/react/i)
// En savoir plus : https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock de matchMedia pour résoudre l'erreur avec react-slick
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

// Ignorer les avertissements de React Router pour les tests
jest.spyOn(console, 'warn').mockImplementation(() => {});
