import { projectActionType } from "../../constants/actionType";
import { axiosInstance } from "../../util/axios";

export const createProject = (projectData) => (dispatch /* , getState */) => {
  return axiosInstance("post", "project/create", projectData)
    .then((res) => res.data)
    .then((res) => {
      // if (res.success) {
      //   dispatch({ type: servicesActionType.MERGE_SERVICES, data: res.data });
      // }
      return res.success;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const fetchProjectStatus =
  (projectId) => (dispatch /* , getState */) => {
    return axiosInstance("get", `project/${projectId}/status/fetch`)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          console.log({ data: res.data });
          dispatch({
            type: projectActionType.MERGE_PROJECT_STATUS_LIST,
            data: res.data,
          });
        }
        return res.success;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

export const createProjectStatus =
  (projectId, statusId, remarks) => (dispatch /* , getState */) => {
    return axiosInstance("post", `project/status/${projectId}/create`, {
      remarks,
      statusId,
    })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: projectActionType.MERGE_PROJECT_STATUS_LIST,
            data: res.data,
          });
        }
        return res.success;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

export const createProjectComment =
  (projectData) => (dispatch /* , getState */) => {
    return axiosInstance("post", "project/comment/create", projectData)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: projectActionType.MERGE_PROJECT_COMMENT,
            projectComments: res.projectComments,
          });
        }
        return res.success;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

export const createQuotationDetails =
  (projectData) => (dispatch /* , getState */) => {
    return axiosInstance("post", "project/qoutation/detail", projectData)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: projectActionType.MERGE_PROJECT_QUOTATION,
            data: res.data,
          });
        }
        return res.success;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

export const createQuotationServices =
  (projectData) => (dispatch /* , getState */) => {
    return axiosInstance("post", "project/quotation/services", projectData)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: projectActionType.MERGE_PROJECT_SERVICES,
            data: res.data,
          });
        }
        return res.success;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

export const showQuotationToClient =
  (projectData) => (dispatch /* , getState */) => {
    const { projectId, project_qoutation_detail_id } = projectData;
    return axiosInstance(
      "put",
      `project/quotation/${projectId}/${project_qoutation_detail_id}/show`
    )
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: projectActionType.MERGE_PROJECT_QUOTATION,
            data: res.data,
          });
        }
        return res.success;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

export const finalizeQuotation =
  (projectData) => (dispatch /* , getState */) => {
    const { projectId, project_qoutation_detail_id } = projectData;
    return axiosInstance(
      "put",
      `project/quotation/${projectId}/${project_qoutation_detail_id}/final`
    )
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: projectActionType.MERGE_PROJECT_QUOTATION,
            data: res.data,
          });
        }
        return res.success;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

export const getProjectAsAdmin = () => (dispatch, getState) => {
  return axiosInstance("get", "project/fetch/admin")
    .then((res) => res.data)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: projectActionType.MERGE_PROJECT_LIST,
          data: res.data,
        });
      }
    });
};

export const getProjects = () => (dispatch, getState) => {
  return axiosInstance("get", "project/fetch")
    .then((res) => res.data)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: projectActionType.MERGE_PROJECT_LIST,
          data: res.data,
        });
      }
    });
};

export const getProjectsTable = () => (dispatch, getState) => {
  return axiosInstance("get", "project/fetch/list")
    .then((res) => res.data)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: projectActionType.MERGE_PROJECT_LIST,
          data: res.data,
        });
      }
    });
};

export const assignEmployee = (projectId, userId) => (dispatch, getState) => {
  return axiosInstance("put", `project/employee/assign/${projectId}`, {
    userId,
  })
    .then((res) => res.data)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: projectActionType.MERGE_PROJECT_DETAILS,
          projectDetails: res.projectDetails,
        });
      }
    });
};

export const getProjectsDetails = (projectId) => (dispatch, getState) => {
  return axiosInstance("get", `project/fetch/${projectId}`)
    .then((res) => res.data)
    .then((res) => {
      if (res.success) {
        dispatch({ type: projectActionType.RESET_PROJECT });
        const {
          projectDetails,
          projectFiles,
          projectComments,
          projectQuotation,
          projectStatus,
        } = res;
        dispatch({
          type: projectActionType.MERGE_PROJECT,
          projectDetails,
          projectFiles,
          projectComments,
          projectQuotation,
          projectStatus,
        });
      }
    });
};
