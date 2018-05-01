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
        yield put(routerRedux.push('/'));
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
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeStatusToLogin(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      setAuthority('admin');
      return {
        ...state,
        status: payload.status || 'ok',
        type: payload.type,
      };
    },
    changeStatusToLogout(state, { payload }) {
      setAuthority('guest');
      deleteTokens();
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
