export const EMAIL_USER = 'EMAIL_USER';

export const SUCESS_REQUIRE = 'SUCESS_REQUIRE';
export const FAILURE_REQUIRE = 'FAILURE_REQUIRE';
export const SUCESS_REQUIRE_TXA = 'SUCESS_REQUIRE_TXA';

export const FORM_EXPENSES = 'FORM_EXPENSES';

export const sumbitEmail = (email) => ({
  type: EMAIL_USER,
  email,
});

export const sucessRequire = (request) => ({
  type: SUCESS_REQUIRE,
  payload: request,
});

export const failureRequire = (error) => ({
  type: FAILURE_REQUIRE,
  error,
});

export function fecthIsRequire() {
  return async (dispatch) => {
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all')
        .then((requestApi) => requestApi.json());
      delete request.USDT;
      const arrRequest = Object.keys(request);
      return dispatch(sucessRequire(arrRequest));
    } catch (error) {
      return dispatch(failureRequire(error));
    }
  };
}

export const sucessRequireTxa = (request) => ({
  type: SUCESS_REQUIRE_TXA,
  payload: request,
});

export function fecthIsRequireTaxa() {
  return async (dispatch) => {
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all')
        .then((requestApi) => requestApi.json());
      delete request.USDT;
      return dispatch(sucessRequireTxa(request));
    } catch (error) {
      return dispatch(failureRequire(error));
    }
  };
}

export const formExpenses = (form) => ({
  type: FORM_EXPENSES,
  payload: form,
});
