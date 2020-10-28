import { DATABASE_URL } from 'utils/database';

const initialState = {
  notes: [],
  isLoading: false,
  editID: null,
  error: null,
};

const SET_LOADING = 'SET_LOADING';
const SET_NOTES = 'SET_NOTES';

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        error: null,
        isLoading: false,
        editID: null,
        notes: action.payload,
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
export const setNotes = notes => ({ type: SET_NOTES, payload: notes });

const fetchNotesWithoutLoading = () => {
  return dispatch => {
    fetch(`${DATABASE_URL}/notes.json`)
      .then(r => r.json())
      .then(notes => {
        const arrayNotes = notes
          ? Object.keys(notes).map(key => {
              return {
                id: key,
                ...notes[key],
              };
            })
          : [];
        dispatch(setNotes(arrayNotes));
      });
  };
};

export const fetchNotes = () => {
  return dispatch => {
    dispatch(setLoading());
    dispatch(fetchNotesWithoutLoading());
  };
};
