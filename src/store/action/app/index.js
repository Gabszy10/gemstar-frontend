import { appActionType } from '../../constants/actionType';
import { axiosInstance } from '../../util/axios';

export const fetchLogs = data => (dispatch /* , getState */) => {
  return axiosInstance('get', 'app/logs/fetch', data)
    .then(res => res.data)
    .then(res => {
      const { success, ...rest } = res;
      if (res.success) {
        dispatch({ type: appActionType.FETCH_LOGS, data: rest });
      }
      return res.success;
    })
    .catch(err => {
      return err.response.data;
    });
};
