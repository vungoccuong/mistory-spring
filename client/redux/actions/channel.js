import * as types from '../actionTypes';
export const initChannel = () => ({ type: types.CHANNEL_LOADING });
export const searchRoom = payload => ({ type: types.ROOM_SEARCHING, payload });
export const loadChannelSuccess = payload => ({ type: types.FETCH_CHANNEL_SUCCESS, payload });
export const loadChannelFailure = payload => ({ type: types.FETCH_CHANNEL_FAILURE, payload });
export const updateLastMessage = payload => ({ type: types.UPDATE_LAST_MESSAGE, payload });
