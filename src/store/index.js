import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { todosReducer } from 'reducers/todosReducer';
import { modalReducer } from 'reducers/modalReducer';

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(middleware);

const combinedReducers = combineReducers({ todosReducer, modalReducer });

const store = createStore(combinedReducers, enhancer);
export default store;
