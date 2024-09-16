import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './app';

describe('App', () => {
  it('works', async () => {
    render(<App />);

    await userEvent.type(screen.getByLabelText(/bill/i), '142.55');
    await userEvent.type(screen.getByLabelText(/select tip %/i), '15');
    await userEvent.type(screen.getByLabelText(/Number of People/i), '5');
    await userEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByTestId(/tip-per-person/i)).toHaveTextContent('$4.28');
    expect(screen.getByTestId(/total-per-person/i)).toHaveTextContent('$32.79');
  });
});
