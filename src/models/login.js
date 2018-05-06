import { routerRedux } from 'dva/router';
import { deleteTokens, setAuthority, setToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { signIn } from '../services/user';

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
        const { access_token: accessToken, refresh_token: refreshToken } = response.data;
        setToken(accessToken, refreshToken);
        reloadAuthorized();
        setTimeout(yield put(routerRedux.push('/')), 1000);
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeStatusToLogout',
          payload: {
            status: false,
            currentAuthority: 'ROLE_GUEST',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
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
