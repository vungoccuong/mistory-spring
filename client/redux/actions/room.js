import * as types from '../actionTypes';
export const pushTyping = payload => ({ type: types.PUSH_TYPING, payload });
export const updateOnlineState = payload => ({ type: types.UPDATE_ONLINE_STATE, payload });
