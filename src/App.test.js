import { render, screen } from '@testing-library/react';
import App from './App';

test('home page shows the name and the main navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Francisco Santos' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Résumé' })).toBeInTheDocument();
});
