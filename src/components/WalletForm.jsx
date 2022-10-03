import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fecthIsRequire } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatchApi } = this.props;
    await dispatchApi();
  }

  render() {
    const { currencies } = this.props;
    return (
      <section>
        <form>
          <label htmlFor="expenses">
            Expenses:
            <input
              type="text"
              id="expenses"
              placeholder="Expenses"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description-expenses">
            Description:
            <textarea
              name="description"
              id="description-expenses"
              cols="10"
              rows="5"
              data-testid="description-input"
              placeholder="description"
            />
          </label>
          <select
            name="cambio"
            id="cambio"
            data-testid="currency-input"
          >
            {currencies.map((element) => (
              <option value={ element } key={ element }>
                {element}
              </option>
            ))}
          </select>
          <select
            name="pagamento"
            id="pagamento"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de crédito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchApi: () => dispatch(fecthIsRequire()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
