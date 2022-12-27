import { projectActionType } from "../../constants/actionType";

const initialState = {
  projectDetails: {},
  projectFiles: [],
  projectQuotation: {},
  projectComments: [],
  projectStatus: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case projectActionType.MERGE_PROJECT:
      const {
        projectDetails,
        projectFiles,
        projectComments,
        projectQuotation,
        projectStatus,
      } = action;
      return {
        ...state,
        projectDetails,
        projectFiles,
        projectComments,
        projectQuotation,
        projectStatus,
      };
    case projectActionType.MERGE_PROJECT_COMMENT:
      return { ...state, projectComments: action.projectComments };
    case projectActionType.MERGE_PROJECT_SERVICES:
      return {
        ...state,
        projectQuotation: { ...state.projectQuotation, services: action.data },
      };
    case projectActionType.MERGE_PROJECT_QUOTATION:
      return { ...state, projectQuotation: action.data };
    case projectActionType.MERGE_PROJECT_DETAILS:
      return {
        ...state,
        projectDetails: { ...action.projectDetails },
      };
    case projectActionType.MERGE_PROJECT_STATUS_LIST:
      return {
        ...state,
        projectStatus: action.data,
      };
    case projectActionType.RESET_PROJECT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
