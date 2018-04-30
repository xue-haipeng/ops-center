import { routerRedux } from 'dva/router';
import { setAuthority, setToken } from '../utils/authority';
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
        type: 'changeLoginStatus',
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
          type: 'changeLoginStatus',
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
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      setAuthority('admin');
      return {
        ...state,
        // status: payload.status,
        status: 'ok',
        type: payload.type,
      };
    },
  },
};
