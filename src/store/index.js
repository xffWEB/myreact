import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { count } from './reducers/index.js';
let reducer = combineReducers({
    count
});
let store = createStore(reducer, applyMiddleware(thunk));
export default store;

window.store = store;