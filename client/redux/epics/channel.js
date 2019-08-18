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
				url: '/v1/room',
			}).pipe(
				map(res => actionsChannel.loadChannelSuccess(res.response)),
				catchError(e => of(actionsChannel.loadChannelFailure(e.xhr.response.message))),
			),
		),
	);
export const channelEpic = combineEpics(initChannel);
