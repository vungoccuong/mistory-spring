import { combineEpics, ofType } from 'redux-observable';
import * as types from '../actionTypes';
import { catchError, concatMap, map } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';
import * as actionsChannel from '../actions/channel';
import { of } from 'rxjs';
export const initChannel = (action$, state$) =>
	action$.pipe(
		ofType(types.CHANNEL_LOADING),
		concatMap(() =>
			request({
				url: '/spring/room/',
			}).pipe(
				map(res => actionsChannel.loadChannelSuccess(res.response)),
				catchError(e => of(actionsChannel.loadChannelFailure(e.xhr.response.message))),
			),
		),
	);
export const searchRoom = (action$, state$) =>
	action$.pipe(
		ofType(types.ROOM_SEARCHING),
		concatMap(action =>
			request({
				url: '/spring/room/search?text=' + action.payload,
			}).pipe(
				map(res => actionsChannel.loadChannelSuccess(res.response)),
				catchError(e => of(actionsChannel.loadChannelFailure(e.xhr.response.message))),
			),
		),
	);
export const channelEpic = combineEpics(initChannel, searchRoom);
