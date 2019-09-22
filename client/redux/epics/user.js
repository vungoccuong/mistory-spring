import { combineEpics, ofType } from 'redux-observable';
import * as types from '../actionTypes';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';
import { of } from 'rxjs';
import * as userActions from '../actions/user';
function setCookie(name, value, days) {
	let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
export const login = ($action, $state) =>
	$action.pipe(
		ofType(types.PERFORM_LOGIN),
		mergeMap(action =>
			request({
				url: '/spring/user/login',
				method: 'POST',
				body: action.payload,
			}).pipe(
				map(response => {
					response.response && setCookie('sid', response.response.jwt);
					return userActions.loginSuccess(response.response);
				}),
				catchError(error =>
					of(
						userActions.loginFailure(
							console.log(error) ||
								(error.xhr.response && error.xhr.response.message) ||
								error.xhr.statusText,
						),
					),
				),
			),
		),
	);
export const userEpic = combineEpics(login);
