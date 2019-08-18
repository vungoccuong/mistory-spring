import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import { rootEpic } from './epics';
export default function initStore(initialState) {
	const epicMiddleware = createEpicMiddleware();
	const logger = createLogger({ collapsed: true }); // log every action to see what's happening behind the scenes.
	const reduxMiddleware = applyMiddleware(epicMiddleware, logger);
	const store = createStore(reducers, initialState, reduxMiddleware);
	epicMiddleware.run(rootEpic);

	return store;
}
