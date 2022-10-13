import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import App from '../../App';

describe('Test Components Login', () => {
  it('check if you have the text change: brl', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    expect(screen.getByText(/cambio: brl/i)).toBeInTheDocument();
  });

  it('check if the delete button appears on the screen', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const inputExpenses = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const buttonAddExpenses = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(inputExpenses, '10');
    userEvent.type(inputDescription, 'pizza');
    userEvent.click(buttonAddExpenses);

    const buttonDelete = await screen.findByTestId('delete-btn');

    expect(buttonDelete).toBeInTheDocument();
  });

  it('checks if information is deleted on click', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const buttonAddExpenses = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.click(buttonAddExpenses);

    const buttonDelete = await screen.findByTestId('delete-btn');

    userEvent.click(buttonDelete);

    expect(buttonDelete).not.toBeInTheDocument();
  });
});
