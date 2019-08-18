import * as types from '../actionTypes';
import { message } from 'antd';
const INIT_STATE = {
	info: {},
	messages: [],
	isFetchingInfo: false,
	isFetchingMessages: false,
	error: null,
};
export default function(state = INIT_STATE, { type, payload }) {
	switch (type) {
		case types.ROOM_INFO_LOADING: {
			return { ...state, isFetchingInfo: true };
		}
		case types.ROOM_MESSAGES_LOADING: {
			return { ...state, isFetchingMessages: true };
		}
		case types.FETCH_ROOM_INFO_SUCCESS:
			return { ...state, isFetchingInfo: false, info: payload };
		case types.FETCH_ROOM_INFO_FAILURE:
			return { ...state, isFetchingInfo: false, error: payload };
		case types.FETCH_ROOM_MESSAGES_SUCCESS:
			return { ...state, isFetchingMessages: false, messages: payload };
		case types.FETCH_ROOM_MESSAGES_FAILURE:
			return { ...state, isFetchingMessages: false, error: payload, messages: [] };
		case types.PUSH_MESSAGE:
			return { ...state, messages: [...state.messages, payload] };
		default: {
			return state;
		}
	}
}
