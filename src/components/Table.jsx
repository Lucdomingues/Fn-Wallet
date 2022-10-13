import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteInfo } from '../redux/actions';

class Table extends Component {
  deleteInformations = ({ target }) => {
    const { dispatchDelete, expenses } = this.props;
    const { id } = target;
    const delet = expenses.filter((element) => element.id !== Number(id));
    dispatchDelete(delet);
  };

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((element) => {
              const value = Number(element.value).toFixed(2);
              const cur = element.currency;
              const coinCur = element.exchangeRates[cur].name;
              const askCur = element.exchangeRates[cur].ask;
              const convert = Number(element.value) * Number(askCur);
              const twoDecimalPlaces = Number(convert).toFixed(2);
              return (
                <tr key={ element.id }>
                  <td>{element.description}</td>
                  <td>{element.tag}</td>
                  <td>{element.method}</td>
                  <td>{value}</td>
                  <td>
                    {coinCur}
                  </td>
                  <td>{Number(askCur).toFixed(2)}</td>
                  <td>{twoDecimalPlaces}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      id={ element.id }
                      data-testid="delete-btn"
                      onClick={ this.deleteInformations }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  dispatchDelete: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (...id) => dispatch(deleteInfo(...id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
