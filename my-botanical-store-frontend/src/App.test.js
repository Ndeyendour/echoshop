import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // Mock console.warn to suppress warnings
  console.warn = jest.fn();
});

afterAll(() => {
  // Restore the original console.warn behavior after the tests
  console.warn.mockRestore();
});

test('renders learn react link', () => {
  render(<App />);
  const phoneLink = screen.getByText('+221772977043');
  expect(phoneLink).toBeInTheDocument();
});
