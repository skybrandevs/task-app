import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';


// combined Reducers
export const combinedReducers = combineReducers({
    auth: authReducer,
});
