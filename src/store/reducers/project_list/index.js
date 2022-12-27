import { projectActionType } from '../../constants/actionType';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case projectActionType.MERGE_PROJECT_LIST:
      return action.data;
    case projectActionType.RESET_PROJECT_LIST:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
