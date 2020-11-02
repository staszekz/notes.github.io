import { DATABASE_URL } from 'utils/database';

const initialState = {
  todos: [],
  isLoading: false,
  editID: null,
  error: null,
};

//actions
const SET_LOADING = 'SET_LOADING';
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

export const setCompleted = (completedId, title, deadline, completed) => {
  return dispatch => {
    fetch(`${DATABASE_URL}/todos/${completedId}.json`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
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
