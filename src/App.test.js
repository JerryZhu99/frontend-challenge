import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('single item click works', async () => {
  render(<App />);
  await waitFor(() => screen.getByText(/select an item/i).click());
  await waitFor(() => screen.getByText(/apple/i).click());
  const el = screen.getByText(/value: "apple"/i);
  expect(el).toBeInTheDocument();
});
