import axios from 'axios';
import request from '../utils/request';
import { getRefreshToken, setToken } from '../utils/authority';
import store from '../index';

axios.defaults.headers.common.Authorization = 'Basic dWFhLXNlcnZpY2U6MTIzNDU2';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('http://localhost:8888/api/v1/demo/currentUser', {
    method: 'POST',
  });
}

export async function signIn() {
  return axios.post(
    'http://localhost:8888/api/v1/uaa/oauth/token?username=xue&password=123456&type=account&grant_type=password'
  );
}

export async function refreshAccessToken() {
  return axios
    .post(
      `http://localhost:8888/api/v1/uaa/oauth/token?grant_type=refresh_token&refresh_token=${getRefreshToken()}`
    )
    .then(res => {
      if (res.status === 200) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data;
        setToken(accessToken, refreshToken);
      }
    })
    .catch(e => {
      const { dispatch } = store;
      const status = e.name;
      if (status === 401) {
        dispatch({
          type: 'login/logout',
        });
      }
    });
}

export async function topFunds() {
  return request('http://localhost:8888/api/v1/fund/top-daily-fund');
}
