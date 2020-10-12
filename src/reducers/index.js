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
const EDIT_TASK = 'EDIT_TASK';

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

    case SET_COMPLETED:
      return {
        ...state,
        todos: state.todos.map(task =>
          task.id === action.payload ? { ...task, completed: true } : task,
        ),
      };

    default:
      return state;
  }
};

export const setLoading = () => ({ type: SET_LOADING });
export const setTodos = todos => ({ type: SET_TODOS, payload: todos });

export const setCompletedAction = (editID, task) => ({
  type: SET_COMPLETED,
  payload: editID,
  todos: task,
});

export const setCompleted = (completedId, content, deadline) => {
  return dispatch => {
    dispatch(setCompletedAction());
    // const toAdd = state.todos.filter(task => task.id === completedId);
    console.log('completed', content, deadline);
    fetch(`${DATABASE_URL}/todos/${completedId}.json`, {
      method: 'PUT',
      body: JSON.stringify({
        content,
        deadline,
        completed: true,
      }),
    }).then(() => {
      dispatch(fetchTodos());
    });
  };
};

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

// export const editTask = editID =>{
//   dispatch(setLoading);

// }
