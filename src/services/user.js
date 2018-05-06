import axios from 'axios';
import request from '../utils/request';
import { getRefreshToken, setToken } from '../utils/authority';
import store from '../index';

// const BASE_URL = 'https://app.haipeng.co'; // remote prod
const BASE_URL = 'http://localhost:8888'; // local dev
const gwInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Basic dWFhLXNlcnZpY2U6MTIzNDU2',
  },
});

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`${BASE_URL}/api/v1/demo/currentUser`, {
    method: 'POST',
  });
}

export async function signIn(payload) {
  try {
    return await gwInstance.post(
      `/api/v1/uaa/oauth/token?username=${payload.username}&password=${payload.password}&type=${
        payload.type
      }&grant_type=password`
    );
  } catch (error) {
    return { ...error.response, type: payload.type };
    // const { status, data } = error.response;
    // if (status === 400 && data.error_description === 'Bad credentials') {
    //   message.error('用户名/密码错误！');
    // }
  }
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
