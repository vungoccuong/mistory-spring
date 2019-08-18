import { combineReducers } from 'redux';
import test from './test';
import room from './room';
import user from './user';
import channel from './channel';
import notification from './notification';
export default combineReducers({ test, room, user, channel, notification });
