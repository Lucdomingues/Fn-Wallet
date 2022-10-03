export const EMAIL_USER = 'EMAIL_USER';

export const SUCESS_REQUIRE = 'SUCESS_REQUIRE';
export const FAILURE_REQUIRE = 'FAILURE_REQUIRE';

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
