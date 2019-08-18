import { combineEpics, ofType } from 'redux-observable';
import * as types from '../actionTypes';
import { catchError, concatMap, map } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';
import * as actionsMessage from '../actions/message';
import { of } from 'rxjs';
export const initMessage = (action$, state$) =>
	action$.pipe(
		ofType(types.ROOM_MESSAGES_LOADING),
		concatMap(action =>
			request({
				url: `/v1/message/${action.payload}`,
			}).pipe(
				map(res => actionsMessage.messageLoadSuccess(res.response)),
				catchError(e => of(actionsMessage.messageLoadFail(e.xhr.response.message))),
			),
		),
	);
export const messageEpic = combineEpics(initMessage);
