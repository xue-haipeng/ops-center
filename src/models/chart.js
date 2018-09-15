import { ascsCpuCurr, fetchCharts, nHoursHostsCpuAvg7, queryHostsDistrType } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    logCountChartList: [
      {
        "x": "17:00:00",
        "y": 7838,
      },
      {
        "x": "18:00:00",
        "y": 7822,
      },
      {
        "x": "19:00:00",
        "y": 7736,
      },
      {
        "x": "20:00:00",
        "y": 7756,
      },
      {
        "x": "21:00:00",
        "y": 7757,
      },
      {
        "x": "22:00:00",
        "y": 7800,
      },
      {
        "x": "23:00:00",
        "y": 7875,
      },
      {
        "x": "00:00:00",
        "y": 7824,
      },
      {
        "x": "01:00:00",
        "y": 7776,
      },
      {
        "x": "02:00:00",
        "y": 7793,
      },
      {
        "x": "03:00:00",
        "y": 7614,
      },
      {
        "x": "04:00:00",
        "y": 7767,
      },
      {
        "x": "05:00:00",
        "y": 7680,
      },
      {
        "x": "06:00:00",
        "y": 7702,
      },
      {
        "x": "07:00:00",
        "y": 7721,
      },
      {
        "x": "08:00:00",
        "y": 7770,
      },
      {
        "x": "10:00:00",
        "y": 7696,
      },
      {
        "x": "11:00:00",
        "y": 7792,
      },
      {
        "x": "12:00:00",
        "y": 7722,
      },
      {
        "x": "13:00:00",
        "y": 7756,
      },
      {
        "x": "14:00:00",
        "y": 7766,
      },
      {
        "x": "15:00:00",
        "y": 7746,
      },
      {
        "x": "16:00:00",
        "y": 7778,
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
      "beaCodeDistr": {
        "BEA-473012": 1,
        "BEA-381967": 16,
        "BEA-381328": 36,
        "BEA-000000": 32,
        "BEA-050001": 7746,
      },
      "userIdDistr": {
        "xs_esb_read": 7746,
        "<anonymous>": 85,
      },
      "bizLineDistr": {
        "YQT": 60,
      },
      "severityDistr": {
        "Warning": 7747,
        "Error": 84,
      },
      "serverDistr": {
        "OSB_Server02": 3826,
        "OSB_Server01": 4005,
      },
      "subSysDistr": {
        "JCA_FRAMEWORK_AND_ADAPTER": 32,
        "JNDI": 7746,
        "ALSB Statistics Manager": 1,
        "JCATransport": 16,
        "WliSbTransports": 36,
      },
    },
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(fetchCharts);
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
        radarData: [],
      };
    },
  },
};
