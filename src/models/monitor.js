import { queryCpuUtlzData } from '../services/monitor';

export default {
  namespace: 'monitor',

  state: {
    keySysCpuUtlz: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryCpuUtlzData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
