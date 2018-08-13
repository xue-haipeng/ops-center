import {
  addTask,
  queryCountByMe,
  queryCountNotFinished,
  queryTaskById,
  queryTasks,
  removeTask,
  updateTask,
} from '../services/team';
import { message } from 'antd';


export default {
  namespace: 'team',

  state: {
    data: {
      list: [],
      pagination: {},
      notFinishedCount: 0,
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
      const res = yield call(addTask, payload);
      if (res && res.id) {
        message.success('添加成功', 4);
      } else {
        message.error('添加失败', 4);
      }
      if (callback) callback();
    },
    *update({ payload, callback }, { call }) {
      const res = yield call(updateTask, payload);
      if (res && res.id) {
        message.success('更新成功', 4);
      } else {
        message.error('更新失败', 4);
      }
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
    *countNotFinished(_, { call, put }) {
      const response = yield call(queryCountNotFinished);
      yield put({
        type: 'saveCount',
        payload: response,
      });
    },
    *countByMe({ payload }, { call, put }) {
      const response = yield call(queryCountByMe, payload);
      yield put({
        type: 'saveCount',
        payload: response,
      });
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
    saveCount(state, action) {
      const data = { ...state.data, notFinishedCount: action.payload }
      return {
        ...state,
        data,
      }
    },
  },
};
