import { notificationActionType } from '../../constants/actionType';
import { axiosInstance } from '../../util/axios';

export const FetchNotification = () => (dispatch /* getState */) => {
  dispatch({
    type: notificationActionType.RESET_NOTIFICATION_LIST
  });
  return axiosInstance('get', 'notif')
    .then(res => res.data)
    .then(res => {
      const { success, ...rest } = res;
      if (success) {
        dispatch({
          type: notificationActionType.MERGE_NOTIFICATION_LIST,
          data: rest
        });
      }
      return res.success;
    });
};

export const DismissNotification =
  notificationId => (dispatch /* getState */) => {
    dispatch({
      type: notificationActionType.RESET_NOTIFICATION_LIST
    });
    return axiosInstance('put', 'notif/dismiss', { notificationId })
      .then(res => res.data)
      .then(res => {
        dispatch({
          type: notificationActionType.MERGE_NOTIFICATION_LIST,
          data: res
        });
      });
  };
