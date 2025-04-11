import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the PortfolioWebsite component to avoid PDF.js setup issues in tests
jest.mock('./components/PortfolioWebsite', () => {
  return function MockPortfolioWebsite() {
    return <div data-testid="portfolio-website">Portfolio Website</div>;
  };
});

test('renders portfolio website component', () => {
  render(<App />);
  const portfolioElement = screen.getByTestId('portfolio-website');
  expect(portfolioElement).toBeInTheDocument();
});