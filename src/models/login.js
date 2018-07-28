import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { deleteTokens, setAuthority, setToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { signIn } from '../services/user';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(signIn, payload);
      yield put({
        type: 'changeStatusToLogin',
        payload: response,
      });
      // Login successfully
      if (response.status === 200) {
        const { username, access_token: accessToken, refresh_token: refreshToken } = response.data;
        setToken(username, accessToken, refreshToken);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        setTimeout(yield put(routerRedux.replace(redirect || '/')), 1000);
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeStatusToLogout',
        payload: {
          status: false,
          currentAuthority: 'ROLE_GUEST',
        },
      });
      reloadAuthorized();
      yield put(routerRedux.push({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      }));
    },
  },

  reducers: {
    changeStatusToLogin(state, { payload }) {
      if (payload.status === 200) {
        const { authorities } = payload.data;
        const authority = authorities.map(ele => ele.authority).join(',');
        setAuthority(authority);
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeStatusToLogout(state, { payload }) {
      setAuthority(payload.currentAuthority);
      deleteTokens();
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
