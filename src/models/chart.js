import { ascsCpuCurr, fetchCharts, nHoursHostsCpuAvg7, queryHostsDistrType } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    logCountChartList: [],
    visitData2: [],
    ascsCpuCurr: [],
    nHoursHostsCpuAvg7: [{"hostname":"EBSAP8001","rate":99.9},{"hostname":"EBSAP4001","rate":99.8}],
    searchData: [],
    hdfsStatsInfo: {
      "dataNodes": [],
    },
    offlineChartData: [],
    hostDistrType: [{
      x: 'ERP平台',
      y: 4544,
    },
      {
        x: '用户平台',
        y: 3321,
      },
      {
        x: '集成平台',
        y: 3113,
      }],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(fetchCharts);
      console.log('res: ', res);
      const arr = [];
      res.ascsCpuCurr.forEach(e => arr.push({x: e.sid, y: e.cpuusage}));
      const payload = { ...res, ascsCpuCurr: arr, hostDistrType: res.hostDistrTypePlatformData };
      console.log('payload: ', payload);
      yield put({
        type: 'save',
        payload,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(ascsCpuCurr);
      const arr = [];
      response.forEach(e => arr.push({x: e.sid, y: e.cpuusage}));
      yield put({
        type: 'save',
        payload: {
          ascsCpuCurr: arr,
        },
      });
    },
    *fetchHostsDistrType({ payload }, { call, put }) {
      const response = yield call(queryHostsDistrType, payload);
      yield put({
        type: 'save',
        payload: {
          hostDistrType: response,
        },
      });
    },
    *fetchNHoursHostsCpuAvg7({ payload }, { call, put }) {
      const response = yield call(nHoursHostsCpuAvg7, payload);
      yield put({
        type: 'save',
        payload: {
          nHoursHostsCpuAvg7: response,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        logCount: [],
        visitData2: [],
        ascsCpuCurr: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        nHoursHostsCpuAvg7: [],
        hostDistrType: [],
        radarData: [],
      };
    },
  },
};
