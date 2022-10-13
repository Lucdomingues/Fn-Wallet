import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import App from '../../App';

describe('Test Components Login', () => {
  it('checks if inputs and button are rendered', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/digite um email/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  it('checks if possible to write in the input', () => {
    const emailMock = 'trybe01@outlook.com';

    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/digite um email/i);

    userEvent.type(inputEmail, emailMock);

    expect(inputEmail).toHaveValue('trybe01@outlook.com');
  });

  it('check if the button is disabled', () => {
    renderWithRouterAndRedux(<App />);

    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

    expect(buttonLogin).toBeDisabled();
  });
});
