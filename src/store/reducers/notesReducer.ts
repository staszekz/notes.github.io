import { getAuth } from 'firebase/auth';
import { DATABASE_URL } from 'src/database/database';

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
  const auth = getAuth();
  return (dispatch, getState) => {
    const uid = auth.currentUser?.uid;
    console.log('🚀 ~ uid:', uid);
    // console.log('note', uid, getState());
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
  const auth = getAuth();
  return (dispatch, getState) => {
    const uid = auth.currentUser?.uid;
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
  const auth = getAuth();

  return (dispatch, getState) => {
    const uid = auth.currentUser?.uid;

    fetch(`${DATABASE_URL}/users/${uid}/notes/${editedId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ ...note }),
    }).then(() => {
      dispatch(fetchNotesWithoutLoading());
    });
  };
};
