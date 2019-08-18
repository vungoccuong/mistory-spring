import * as types from '../actionTypes';
const INIT_STATE = {
	username: null,
	fullName: null,
	avatar: null,
	isFetching: false,
	error: null,
};
export default function user(state = INIT_STATE, { type, payload }) {
	switch (type) {
		case types.USER_LOADING: {
			return {
				...state,
				isFetching: true,
			};
		}
		case types.LOGIN_SUCCESS: {
			const { username, fullName, avatar } = payload;
			return {
				...state,
				username,
				fullName,
				avatar,
				isFetching: false,
			};
		}
		case types.LOGIN_FAILURE: {
			return {
				...state,
				error: payload,
				isFetching: false,
			};
		}

		default:
			return state;
	}
}
