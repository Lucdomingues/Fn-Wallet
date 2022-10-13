import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { MdEmail, MdLock } from 'react-icons/md';
import { sumbitEmail } from '../redux/actions';
import './login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValidation: true,
  };

  handleUser = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    }, () => {
      this.disableValidation();
    });
  };

  disableValidation = () => {
    const { email, password } = this.state;

    const NUMBER_MIN = 6;
    const regex = /\S+@\S+\.\S+/;
    const validacion = regex.test(email);
    const condicion = password.length >= NUMBER_MIN;

    const validation = (
      !validacion
      || !condicion
    );
    this.setState({ isValidation: validation });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatchUser, history } = this.props;
    dispatchUser(email);
    history.push('/carteira');
  };

  render() {
    const { isValidation } = this.state;
    return (
      <section className="login">
        <div className="login-logo">
          <img src="https://cdn-icons-png.flaticon.com/512/189/189709.png" alt="logo-wallet" />
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="login-right">
            <h1>FnWallet</h1>

            <div className="login-loginInputEmail">
              <MdEmail />
              <input
                type="text"
                data-testid="email-input"
                name="email"
                id="email"
                placeholder="Digite um email"
                onChange={ this.handleUser }
              />
            </div>

            <div className="login-loginInputPassword">
              <MdLock />
              <input
                type="password"
                name="password-input"
                id="password"
                placeholder="Digite sua senha"
                data-testid="password-input"
                onChange={ this.handleUser }
              />
            </div>
            <button
              type="submit"
              disabled={ isValidation }
            >
              Entrar
            </button>
          </div>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatchUser: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (...email) => dispatch(sumbitEmail(...email)),
});

export default connect(null, mapDispatchToProps)(Login);
