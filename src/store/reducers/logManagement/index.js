import { appActionType } from '../../constants/actionType';

const initialState = {
  data: [],
  totalCount: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case appActionType.FETCH_LOGS:
      return action.data;
    case appActionType.RESET_LOGS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
