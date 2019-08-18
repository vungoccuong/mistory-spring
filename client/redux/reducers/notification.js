import * as types from '../actionTypes';
const INIT_STATE = {
	notifications: [],
	error: null,
	isFetching: false,
};
export default function(state = INIT_STATE, { type, payload }) {
	switch (type) {
		case types.FETCH_NOTIFICATION: {
			return {
				...state,
				isFetching: true,
			};
		}
		case types.FETCH_NOTIFICATION_SUCCESS: {
			return {
				...state,
				notifications: payload,
				isFetching: false,
			};
		}
		case types.FETCH_NOTIFICATION_FAILURE: {
			return {
				...state,
				notifications: [],
				isFetching: false,
				error: payload,
			};
		}
		default:
			return state;
	}
}
