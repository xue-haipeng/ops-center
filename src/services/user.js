import axios from 'axios';
import request from '../utils/request';
import { getCurrentUser, getRefreshToken, setToken } from '../utils/authority';
import store from '../index';

// const BASE_URL = 'https://app.haipeng.co'; // remote prod
const BASE_URL = 'http://11.11.47.72:8888/api/v1/'; // local dev
const gwInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Basic dWFhLXNlcnZpY2U6MTIzNDU2',
  },
});

export async function query() {
  return request('users');
}

export async function queryCurrent() {
  return request(`/users/${getCurrentUser()}`);
}

export async function signIn(payload) {
  try {
    return await gwInstance.post(
      `uaa/oauth/token?username=${payload.username}&password=${
        payload.password
      }&grant_type=password`
    );
  } catch (error) {
    return { ...error.response, type: payload.type };
  }
}

export async function refreshAccessToken(config) {
  return gwInstance
    .post(`uaa/oauth/token?grant_type=refresh_token&refresh_token=${getRefreshToken()}`)
    .then(res => {
      if (res.status === 200) {
        const { username, access_token: accessToken, refresh_token: refreshToken } = res.data;
        setToken(username, accessToken, refreshToken);
        // eslint-disable-next-line no-console
        console.log('config: ', config);
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

export async function updateAccount(payload) {
  return request('/users', {
    method: 'PUT',
    data: {
      ...payload,
    },
  });
}
export async function updatePasswd(payload) {
  return request('/users/passwd', {
    method: 'PUT',
    data: {
      ...payload,
    },
  });
}
