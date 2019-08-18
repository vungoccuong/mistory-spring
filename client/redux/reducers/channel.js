import * as types from '../actionTypes';
const INIT_STATE = {
	rooms: [],
	isFetching: false,
	error: null,
};
export default function(state = INIT_STATE, { type, payload }) {
	switch (type) {
		case types.CHANNEL_LOADING:
			return {
				...state,
				isFetching: true,
			};
		case types.FETCH_CHANNEL_SUCCESS: {
			return {
				...state,
				rooms: payload,
				isFetching: false,
			};
		}
		case types.FETCH_CHANNEL_FAILURE: {
			return {
				...state,
				error: null,
			};
		}
		case types.UPDATE_LAST_MESSAGE: {
			return {
				...state,
				rooms: state.rooms.map(room => {
					if (room._id === payload.room) {
						room.lastMessage = payload;
					}
					return room;
				}),
			};
		}
		default:
			return state;
	}
}
