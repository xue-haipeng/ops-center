import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';
import { hostsByMaintainer, updateHostPasswd, verifyHostPasswd } from '../services/tools';

export default {
  namespace: 'tools',

  state: {
    hosts: [],
    selectedHosts: [],
    username: '',
    password: '',
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(hostsByMaintainer, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *verifyPassword({ payload }, { call, put }) {
      yield call(verifyHostPasswd, payload);
      yield put({
        type: 'saveCredential',
        payload,
      })
    },
    *saveSelectedHosts({ payload }, { put }) {
      yield put({
        type: 'saveHosts',
        payload,
      });
      // yield put(routerRedux.push('/tools/passwd-mgt/step2'));
    },
    *changePassword({ payload }, { call }) {
      console.log('payload: ', payload);
      yield call(updateHostPasswd, payload);
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    save(state, action) {
      const hosts = action.payload;
      return {
        ...state,
        hosts,
      };
    },
    saveHosts(state, { payload }) {
      return {
        ...state,
        selectedHosts: payload,
      };
    },
    saveCredential(state, { payload }) {
      return{
        ...state,
        ...payload,
      }
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
