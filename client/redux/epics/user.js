import { combineEpics, ofType } from 'redux-observable';
import * as types from '../actionTypes';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';
import { of } from 'rxjs';
import * as userActions from '../actions/user';
export const login = ($action, $state) =>
	$action.pipe(
		ofType(types.PERFORM_LOGIN),
		mergeMap(action =>
			request({
				url: '/v1/user/login',
				method: 'POST',
				body: action.payload,
			}).pipe(
				map(response => {
					return userActions.loginSuccess(response.response);
				}),
				catchError(error =>
					of(userActions.loginFailure(error.xhr.response || error.xhr.statusText)),
				),
			),
		),
	);
export const userEpic = combineEpics(login);
