import { servicesActionType } from '../../constants/actionType';
import { axiosInstance } from '../../util/axios';

export const addServices = serviceData => (dispatch /* , getState */) => {
  return axiosInstance('post', 'services/add', serviceData)
    .then(res => res.data)
    .then(res => {
      if (res.success) {
        dispatch({ type: servicesActionType.MERGE_SERVICES, data: res.data });
      }
    })
    .catch(err => {
      return err.response.data;
    })
};

export const fetchServices = () => (dispatch, getState) => {
  return axiosInstance('get', 'services/fetch')
    .then(res => res.data)
    .then(res => {
      if (res.success) {
        dispatch({ type: servicesActionType.MERGE_SERVICES, data: res.data });
      }
    });
};