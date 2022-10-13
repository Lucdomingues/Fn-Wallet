import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import App from '../../App';
import WalletForm from '../../components/WalletForm';

describe('Test Components Wallet', () => {
  it('checks if the page is rendered on click', () => {
    const loginMock = {
      email: 'trybe@outlook.com',
    };
    renderWithRouterAndRedux(
      <App />,
      {
        initialState: loginMock,
        initialEntries: ['/carteira'],
      },
    );

    const inputExpenses = screen.getByRole('textbox', { name: /expenses/i });

    expect(inputExpenses).toBeInTheDocument();
  });

  it('checks if possible to write in the input wallet', () => {
    const emailMock = 'trybe03@outlook.com';

    renderWithRouterAndRedux(<WalletForm />);

    const inputExpenses = screen.getByRole('textbox', { name: /expenses:/i });

    userEvent.type(inputExpenses, emailMock);

    expect(inputExpenses).toHaveValue('trybe03@outlook.com');
  });

  it('checks if possible to write in the input description wallet', () => {
    const emailMock = 'Hot Dog';

    renderWithRouterAndRedux(<WalletForm />);

    const inputDescription = screen.getByRole('textbox', { name: /Description:/i });

    userEvent.type(inputDescription, emailMock);

    expect(inputDescription).toHaveValue('Hot Dog');
  });

  it('checks if clicking on the button inputs empty', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const buttonDispatch = screen.getByRole('button', { name: /adicionar despesa/i });
    const inputExpenses = screen.getByRole('textbox', { name: /expenses:/i });

    userEvent.click(buttonDispatch);

    expect(inputExpenses).toHaveValue('');
  });

  it('check if you are on the correct route', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });

  it('checks if clicking enter is redirected', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/'],
    });

    const inputEmail = screen.getByPlaceholderText(/digite um email/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputEmail, 'test@outlook.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/carteira');
  });
});
