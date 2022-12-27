import { authUserActionType } from '../../constants/actionType';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authUserActionType.MERGE_USER_LIST:
      return action.data;
    case authUserActionType.RESET_USER_LIST:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
