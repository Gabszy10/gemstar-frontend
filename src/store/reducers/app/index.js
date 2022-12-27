import { authUserActionType } from '../../constants/actionType';

const initialState = {
  isAuthenticated: false,
  navLinks: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authUserActionType.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.data };
      // return {isAuthenticated: action.data};
    case authUserActionType.UNSET_AUTHENTICATED:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
