const initialState = {
  isModalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        isModalOpen: !state.isModalOpen,
      };

    default:
      return state;
  }
};

export const toggleModalOpen = () => ({ type: 'TOGGLE_MODAL' });
