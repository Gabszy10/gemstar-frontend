import { notificationActionType } from '../../constants/actionType';

const initialState = {
  data: [],
  totalCount: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationActionType.MERGE_NOTIFICATION_LIST:
      return action.data;
    case notificationActionType.RESET_NOTIFICATION_LIST:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
