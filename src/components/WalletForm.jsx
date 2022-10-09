import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fecthIsRequire, fecthIsRequireTaxa, formExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    despesas: '',
    description: '',
    currency: 'USD',
    pagamento: 'Alimentação',
    tag: 'Dinheiro',
  };

  async componentDidMount() {
    const { dispatchApi } = this.props;
    await dispatchApi();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { dispatchApiTaxa } = this.props;
    await dispatchApiTaxa();
    this.handleSubmit();
  };

  handleSubmit = () => {
    const { dispatchSubmit, expenses, exchangeRates } = this.props;
    const {
      despesas,
      description,
      currency,
      pagamento,
      tag,
    } = this.state;
    const obj = {
      id: expenses.length,
      value: despesas,
      description,
      currency,
      method: pagamento,
      tag,
      exchangeRates,
    };
    dispatchSubmit(obj);
    this.setState({
      despesas: '',
      description: '',
      currency: 'USD',
      pagamento: 'Alimentação',
      tag: 'Dinheiro',
    });
  };

  render() {
    const { currencies } = this.props;
    const { despesas, description, currency, pagamento, tag } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="expenses">
            Expenses:
            <input
              type="text"
              name="despesas"
              id="expenses"
              value={ despesas }
              placeholder="Expenses"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              name="description"
              value={ description }
              id="description"
              cols="10"
              rows="5"
              data-testid="description-input"
              placeholder="description"
              onChange={ this.handleChange }
            />
          </label>
          <select
            name="currency"
            id="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies?.map((element) => (
              <option value={ element } key={ element }>
                {element}
              </option>
            ))}
          </select>
          <select
            name="pagamento"
            id="pagamento"
            value={ pagamento }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            id="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchApi: PropTypes.func.isRequired,
  dispatchApiTaxa: PropTypes.func.isRequired,
  dispatchSubmit: PropTypes.func.isRequired,
  exchangeRates: PropTypes.shape({}).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.txa,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchApi: () => dispatch(fecthIsRequire()),
  dispatchApiTaxa: () => dispatch(fecthIsRequireTaxa()),
  dispatchSubmit: (...form) => dispatch(formExpenses(...form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
