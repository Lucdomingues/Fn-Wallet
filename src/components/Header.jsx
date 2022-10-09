import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  convertion = () => {
    const { expenses } = this.props;
    const initialValue = 0;
    const convertion = expenses.reduce((acc, curr) => {
      const cur = curr.currency;
      const askCur = curr.exchangeRates[cur].ask;
      const convert = Number(askCur) * Number(curr.value);
      const calc = acc + Number(convert);
      return calc;
    }, initialValue);
    return convertion;
  };

  render() {
    const { email } = this.props;
    const soma = Number(this.convertion()).toFixed(2);
    return (
      <header>
        <p data-testid="email-field">
          Email:
          {email}
        </p>
        <p data-testid="total-field">{ soma }</p>
        <p data-testid="header-currency-field">
          Cambio:
          BRL
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
