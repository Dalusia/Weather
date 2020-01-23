import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders dalusia weather header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/dalusia weather/i);
  expect(linkElement).toBeInTheDocument();
});
