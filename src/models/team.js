import { addTask, queryTaskById, queryTasks, removeTask, updateTask } from '../services/team';


export default {
  namespace: 'team',

  state: {
    data: {
      list: [],
      pagination: {},
      taskInfo: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTasks, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call }) {
      yield call(addTask, payload);
      if (callback) callback();
    },
    *update({ payload, callback }, { call }) {
      yield call(updateTask, payload);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call }) {
      yield call(removeTask, payload);
      if (callback) callback();
    },
    *queryTask({ payload, callback }, { call, put }) {
      const response = yield call(queryTaskById, payload);
      yield put({
        type: 'saveTask',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      const { content: list, totalElements: total, size: pageSize, number } = action.payload;
      const current = number + 1;
      const pagination = { current, pageSize, total };
      return {
        ...state,
        data: { list, pagination },
      };
    },

    saveTask(state, action) {
      const task = { ...action.payload };
      const data = { ...state.data, task };
      return {
        ...state,
        data,
      };
    },
  },
};
