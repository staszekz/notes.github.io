import { DATABASE_URL } from 'utils/database';

const initialState = {
  todos: [],
  isLoading: false,
  editID: null,
  error: null,
};

//actions
const SET_LOADING = 'SET_LOADING';
const ADD_TASK = 'ADD_TASK';
const SET_COMPLETED = 'SET_COMPLETED';
const SET_TODOS = 'SET_TODOS';

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        error: null,
        isLoading: false,
        editID: null,
        todos: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_TASK:
      return {
        error: null,
        isLoading: false,
        editID: null,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export const setLoading = () => ({ type: SET_LOADING });
export const setTodos = todos => ({ type: SET_TODOS, payload: todos });

export const fetchTodos = () => {
  return dispatch => {
    dispatch(setLoading());

    fetch(`${DATABASE_URL}/todos.json`)
      .then(r => r.json())
      .then(todos => {
        const arrayTodos = todos
          ? Object.keys(todos).map(key => {
              return {
                id: key,
                ...todos[key],
              };
            })
          : [];
        dispatch(setTodos(arrayTodos));
      });
  };
};

export const addNewTask = taskData => {
  dispatch(setLoading());

  fetch(`${DATABASE_URL}/todos/.json`, {
    method: 'POST',
    body: JSON.stringify(taskData),
  }).then(() => {
    dispatch(setTodos());
  });
};
