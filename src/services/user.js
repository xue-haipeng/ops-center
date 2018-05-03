import axios from 'axios';
import request from '../utils/request';
import { getRefreshToken, setToken } from '../utils/authority';
import store from '../index';

const gwInstance = axios.create({
  baseURL: 'http://localhost:8888', // local dev
  // baseURL: 'https://app.haipeng.co',  // remote prod
  headers: {
    Authorization: 'Basic dWFhLXNlcnZpY2U6MTIzNDU2',
  },
});

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('http://localhost:8888/api/v1/demo/currentUser', {
    method: 'POST',
  });
}

export async function signIn() {
  return gwInstance.post(
    '/api/v1/uaa/oauth/token?username=xue&password=123456&type=account&grant_type=password'
  );
}

export async function refreshAccessToken(config) {
  return gwInstance
    .post(`/api/v1/uaa/oauth/token?grant_type=refresh_token&refresh_token=${getRefreshToken()}`)
    .then(res => {
      if (res.status === 200) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data;
        setToken(accessToken, refreshToken);
        // eslint-disable-next-line no-console
        console.log(config);
        /*        const headers = { ...config.headers, Authorization: `Bearer ${getAccessToken()}` };
        const newConfig = { ...config, headers };
        axios(newConfig); */
        location.reload(true);
      }
    })
    .catch(e => {
      const { dispatch } = store;
      const { status, data } = e.response;
      if (status === 401 && data.error === 'invalid_token') {
        dispatch({
          type: 'login/logout',
        });
      }
    });
}

export async function topFunds() {
  return request('/api/v1/fund/top-daily-fund');
}
