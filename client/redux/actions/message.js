import * as types from '../actionTypes';
export const messageLoading = roomId => ({ type: types.ROOM_MESSAGES_LOADING, payload: roomId });
export const messageLoadSuccess = payload => ({ type: types.FETCH_ROOM_MESSAGES_SUCCESS, payload });
export const messageLoadFail = payload => ({ type: types.FETCH_ROOM_MESSAGES_FAILURE, payload });
export const pushMessage = payload => ({type: types.PUSH_MESSAGE, payload });
