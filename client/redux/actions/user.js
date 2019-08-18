import * as types from '../actionTypes';
export const login = (username, password) => ({
	type: types.PERFORM_LOGIN,
	payload: { username, password },
});
export const loginSuccess = payload => ({
	type: types.LOGIN_SUCCESS,
	payload,
});
export const loginFailure = error => ({
	type: types.LOGIN_FAILURE,
	payload: error,
});

export const logon = (fullName, username, password) => ({
	type: types.PERFORM_LOGON,
	payload: { fullName, username, password },
});
