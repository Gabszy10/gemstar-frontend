import { servicesActionType } from '../../constants/actionType';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case servicesActionType.MERGE_SERVICES:
      return action.data;
    case servicesActionType.RESET_SERVICES:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
