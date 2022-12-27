import axios from 'axios';
import cookie from 'js-cookie';

export const axiosInstance = (method, url, data) => {
  const requestConfig = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User_Cookie': cookie.get("_wus_BJK"),
    },
    withCredentials: true
  };
  return axios({
    method: method,
    url: `${process.env.REACT_APP_API_ENDPOINT}${url}`,
    data: data,
    ...requestConfig
  });
};
