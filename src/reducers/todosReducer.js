import { DATABASE_URL } from 'utils/database';

const initialState = {
  todos: [],
  isLoading: false,
  editID: null,
  error: null,
};

//actions
const SET_LOADING = 'SET_LOADING';
// const ADD_TASK = 'ADD_TASK';
// const SET_COMPLETED = 'SET_COMPLETED';
const SET_TODOS = 'SET_TODOS';
// const EDIT_TASK = 'EDIT_TASK';

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

    default:
      return state;
  }
};

export const setLoading = () => ({ type: SET_LOADING });
export const setTodos = todos => ({ type: SET_TODOS, payload: todos });

const fetchWithoutLoading = () => {
  return dispatch => {
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

export const setCompleted = (completedId, content, deadline, completed) => {
  return dispatch => {
    fetch(`${DATABASE_URL}/todos/${completedId}.json`, {
      method: 'PUT',
      body: JSON.stringify({
        content,
        deadline,
        completed: !completed,
      }),
    }).then(() => {
      dispatch(fetchWithoutLoading());
    });
  };
};

export const fetchTodos = () => {
  return dispatch => {
    dispatch(setLoading());
    dispatch(fetchWithoutLoading());
  };
};

export const addNewTask = taskData => {
  return dispatch => {
    fetch(`${DATABASE_URL}/todos/.json`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    }).then(() => {
      dispatch(fetchWithoutLoading());
    });
  };
};

export const deleteTask = deletedId => {
  return dispatch => {
    fetch(`${DATABASE_URL}/todos/${deletedId}.json`, {
      method: 'DELETE',
    }).then(() => {
      dispatch(fetchWithoutLoading());
    });
  };
};

export const editTask = (task, editedId) => {
  return dispatch => {
    fetch(`${DATABASE_URL}/todos/${editedId}.json`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }).then(() => {
      dispatch(fetchWithoutLoading());
    });
  };
};
