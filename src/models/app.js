import {
  queryHosts,
  removeHosts,
  addHost,
  updateHost,
  claimHosts,
  queryVmInfo,
} from '../services/app';

export default {
  namespace: 'app',

  state: {
    data: {
      list: [],
      pagination: {},
      vmInfo: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHosts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call }) {
      yield call(addHost, payload);
      if (callback) callback();
    },
    *update({ payload, callback }, { call }) {
      yield call(updateHost, payload);
      if (callback) callback();
    },

    *remove({ payload, callback }, { call }) {
      yield call(removeHosts, payload);
      if (callback) callback();
    },

    *claim({ payload, callback }, { call }) {
      yield call(claimHosts, payload);
      if (callback) callback();
    },

    *queryVm({ payload, callback }, { call, put }) {
      const response = yield call(queryVmInfo, payload);
      yield put({
        type: 'saveVmInfo',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      const { list, total, pageSize, pageNum: current } = action.payload;
      const pagination = { current, pageSize, total };
      return {
        ...state,
        data: { list, pagination },
      };
    },

    saveVmInfo(state, action) {
      const vmInfo = { ...action.payload };
      const data = { ...state.data, vmInfo };
      return {
        ...state,
        data,
      };
    },
  },
};
