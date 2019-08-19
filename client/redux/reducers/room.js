import * as types from '../actionTypes';
const INIT_STATE = {
	info: {},
	messages: [],
	isFetchingInfo: false,
	isFetchingMessages: false,
	error: null,
	isTypings: new Set(),
};
export default function(state = INIT_STATE, { type, payload }) {
	switch (type) {
		case types.ROOM_INFO_LOADING: {
			return { ...state, isFetchingInfo: true };
		}
		case types.ROOM_MESSAGES_LOADING: {
			return { ...state, isFetchingMessages: true, isTypings: new Set() };
		}
		case types.FETCH_ROOM_INFO_SUCCESS:
			return { ...state, isFetchingInfo: false, info: payload, isTypings: new Set() };
		case types.FETCH_ROOM_INFO_FAILURE:
			return { ...state, isFetchingInfo: false, error: payload };
		case types.FETCH_ROOM_MESSAGES_SUCCESS:
			return { ...state, isFetchingMessages: false, messages: payload, isTypings: new Set() };
		case types.FETCH_ROOM_MESSAGES_FAILURE:
			return { ...state, isFetchingMessages: false, error: payload, messages: [] };
		case types.PUSH_MESSAGE:
			return { ...state, messages: [...state.messages, payload] };
		case types.PUSH_TYPING: {
			const { isTyping, username } = payload;
			const isTypings = state.isTypings;
			if (isTyping) {
				isTypings.add(username);
			} else {
				isTypings.delete(username);
			}
			return { ...state, isTypings: new Set(isTypings) };
		}
		default: {
			return state;
		}
	}
}
