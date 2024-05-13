const initialState = {
  isModalOpen: false,
  createdDate: '',
};
interface Action {
  type: string;
  payload?: any;
}
export const modalReducer = (state = initialState, action: Action) => {
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
