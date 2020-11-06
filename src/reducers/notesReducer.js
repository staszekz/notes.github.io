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
  return (dispatch, getState) => {
    const uid = getState().firebaseReducer.auth.uid;
    console.log('note', uid, getState());
    fetch(`${DATABASE_URL}/users/${uid}/notes.json`)
      .then(r => r.json())
      .then(notes => {
        const arrayNotes = notes
          ? Object.keys(notes)
              .map(key => {
                return {
                  id: key,
                  ...notes[key],
                };
              })
              .reverse()
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

export const addNewNote = noteData => {
  return (dispatch, getState) => {
    const uid = getState().firebaseReducer.auth.uid;
    fetch(`${DATABASE_URL}/users/${uid}/notes.json`, {
      method: 'POST',
      body: JSON.stringify(noteData),
    }).then(() => {
      dispatch(fetchNotesWithoutLoading());
    });
  };
};

export const deleteNote = deletedId => {
  return (dispatch, getState) => {
    const uid = getState().firebaseReducer.auth.uid;
    fetch(`${DATABASE_URL}/users/${uid}/notes/${deletedId}.json`, {
      method: 'DELETE',
    }).then(() => {
      dispatch(fetchNotesWithoutLoading());
    });
  };
};

export const editNote = (note, editedId) => {
  return (dispatch, getState) => {
    const uid = getState().firebaseReducer.auth.uid;
    fetch(`${DATABASE_URL}/users/${uid}/notes/${editedId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ ...note }),
    }).then(() => {
      dispatch(fetchNotesWithoutLoading());
    });
  };
};
