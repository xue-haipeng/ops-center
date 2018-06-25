import { queryHosts, removeHosts, addHosts } from '../services/app';

export default {
  namespace: 'app',

  state: {
    data: {
      list: [],
      pagination: {},
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
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addHosts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeHosts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      const { list, total, pageSize, pageNum: current } = action.payload.data;
      console.log("list: ", list, ", payload: ", action.payload);
      const pagination = { current, pageSize, total };
      return {
        ...state,
        data: { list, pagination },
      };
    },
  },
};
