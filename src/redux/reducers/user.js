import { EMAIL_USER } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_USER:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
