/* eslint-disable guard-for-in */
import { monitoringCharts, queryCpuUtlzData } from '../services/monitor';

export default {
  namespace: 'monitor',

  state: {
    vmDiskUsage: [],
    keySysCpuUtlz: {
      EXOAPS: [],
      EXBAPT: [],
      EESAP6: [],
      ERPHP: [],
      EZHAP5: [],
      EESAPF: [],
      EESAP2: [],
      EESAP8: [],
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(monitoringCharts);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      const keySysCpuUtlz = {
          EXOAPS: [],
          EXBAPT: [],
          EESAP6: [],
          ERPHP: [],
          EZHAP5: [],
          EESAPF: [],
          EESAP2: [],
          EESAP8: [],
      };
      const { keySysCpuLineData, vmDiskUsageTabData: vmDiskUsage, tbsUsageTabData } = action.payload;
      const today = new Date();

      for (const prefix in keySysCpuLineData) {
        const rawData = keySysCpuLineData[prefix];
        const formatedData = [];
        for (const index in rawData) {
          const arr = rawData[index].data
            .map(item =>
              [Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),
                item.x.split(":")[0], item.x.split(":")[1], item.x.split(":")[2]), item.y]);
          const item = { name: rawData[index].name, data: arr.sort((a, b) => a[0] - b[0]) };
          formatedData.push(item);
        }
        keySysCpuUtlz[prefix] = formatedData;
      }

      return {
        ...state,
        keySysCpuUtlz,
        vmDiskUsage,
        tbsUsageTabData,
      };
    },
  },
};
