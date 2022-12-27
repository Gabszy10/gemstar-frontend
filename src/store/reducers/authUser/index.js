import { authUserActionType } from '../../constants/actionType';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authUserActionType.LOGIN_USER:
      return action.data;
    case authUserActionType.AUTH_SUCCESS:
      return action.data;
    case authUserActionType.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
