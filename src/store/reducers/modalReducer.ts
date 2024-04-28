const initialState = {
  isModalOpen: false,
  createdDate: '',
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        isModalOpen: !state.isModalOpen,
        createdDate: `${new Date().toLocaleString()}`,
      };

    default:
      return state;
  }
};

export const toggleModalOpen = () => ({ type: 'TOGGLE_MODAL' });
