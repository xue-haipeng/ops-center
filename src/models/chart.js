import { ascsCpuCurr, fetchCharts, nHoursHostsCpuAvg7, queryHostsDistrType } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    logCountChartList: [
      {
        "x": "2018-10-10T17:00:00",
        "y": 7838,
      },
      {
        "x": "2018-10-10T18:00:00",
        "y": 7822,
      },
      {
        "x": "2018-10-10T19:00:00",
        "y": 7736,
      },
      {
        "x": "2018-10-10T20:00:00",
        "y": 7756,
      },
    ],
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
    wlsLastHourDistr: {
      "beaCodeDistr": {},
      "userIdDistr": {},
      "bizLineDistr": {},
      "severityDistr": {},
      "serverDistr": {},
      "subSysDistr": {},
    },
    backupRecords: [
      {id: 1, system: 'CPF-生产', beforeystd: 'OK', yesterday: 'OK', today: 'Failed'},
      {id: 2, system: 'OSB上市-生产', beforeystd: 'OK', yesterday: 'N/A', today: 'Failed'},
      {id: 3, system: 'BPM流程-测试', beforeystd: 'OK', yesterday: 'Failed', today: 'Failed'},
      {id: 4, system: 'OBIEE勘探-开发', beforeystd: 'OK', yesterday: 'OK', today: 'OK'},
      {id: 5, system: '未上市BW-测试', beforeystd: 'N/A', yesterday: 'OK', today: 'Failed'},
      {id: 6, system: '人力资源自主开发-生产', beforeystd: 'Failed', yesterday: 'OK', today: 'OK'},
    ],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(fetchCharts);
      const arr = [];
      res.ascsCpuCurr.forEach(e => arr.push({x: e.sid, y: e.cpuusage}));
      const payload = { ...res, ascsCpuCurr: arr, hostDistrType: res.hostDistrTypePlatformData };
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
        logCountChartList: [],
        visitData2: [],
        ascsCpuCurr: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        nHoursHostsCpuAvg7: [],
        hostDistrType: [],
        hdfsStatsInfo: {
          "dataNodes": [],
        },
        wlsLastHourDistr: {},
        backupRecords: [],
        radarData: [],
      };
    },
  },
};
