import { message } from 'antd';
import { query as queryUsers, queryCurrent, updateAccount, updatePasswd } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateAccount({ payload }, { call }) {
      const response = yield call(updateAccount, payload);
      if (response.status === 0) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *changePasswd({ payload }, { call }) {
      const response = yield call(updatePasswd, payload);
      if (response.status === 0) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      console.log('changeNotifyCount: ', action.payload);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload || {},
        },
      };
    },
  },
};
