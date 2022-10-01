import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { sumbitEmail } from '../redux/actions';

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
      <section>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            data-testid="email-input"
            id="email"
            onChange={ this.handleUser }
          />
          <input
            type="password"
            name="password-input"
            id="password"
            data-testid="password-input"
            onChange={ this.handleUser }
          />
          <button
            type="submit"
            disabled={ isValidation }
          >
            Entrar
          </button>
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
