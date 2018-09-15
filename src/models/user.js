import { message } from 'antd';
import {
  createAccount,
  deleteAccount,
  query as queryUsers,
  queryCurrent,
  updateAccount,
  updatePasswd, updatePasswdByAdmin,
} from '../services/user';

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
    *createAccount({ payload }, { call }) {
      const response = yield call(createAccount, payload);
      if (response.status === 0) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
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
    *changePasswdByAdmin({ payload }, { call }) {
      const response = yield call(updatePasswdByAdmin, payload);
      if (response.status === 0) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *deleteUser({ payload }, { call }) {
      const response = yield call(deleteAccount, payload);
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
      const { account, notifyCount, taskNotFinishedOfMe, taskTotalOfMe, taskTotalCount, taskTotalNotFinished } = action.payload;
      const currentUser = {
        ...account,
        notifyCount,
        taskNotFinishedOfMe,
        taskTotalOfMe,
        taskTotalCount,
        taskTotalNotFinished,
      };
      return {
        ...state,
        currentUser,
      };
    },
    changeNotifyCount(state, action) {
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
