import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { todosReducer } from './reducers/todosReducer';
import { modalReducer } from './reducers/modalReducer';
import { notesReducer } from './reducers/notesReducer';
import { firebaseReducer } from 'react-redux-firebase';

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(middleware);

const combinedReducers = combineReducers({
  todosReducer,
  modalReducer,
  notesReducer,
  firebaseReducer,
});

const store = createStore(combinedReducers, enhancer);
export default store;
