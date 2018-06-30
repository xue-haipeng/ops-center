import moment from 'moment';

// mock data
const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [
  { x: 'EMP', y: 2 },
  { x: 'OSP', y: 12 },
  { x: 'COP', y: 26 },
  { x: 'EP9', y: 13 },
  { x: 'ZYP', y: 3 },
  { x: 'EP1', y: 4 },
  { x: 'EP4', y: 9 },
  { x: 'TKM', y: 2 },
  { x: 'HP1', y: 32 },
  { x: 'EP6', y: 8 },
  { x: 'EP7', y: 2 },
  { x: 'CP6', y: 6 },
  { x: 'CPF', y: 17 },
  { x: 'CPO', y: 7 },
  { x: 'EP8', y: 22 },
  { x: 'CP8', y: 11 },
  { x: 'EP3', y: 3 },
  { x: 'CP3', y: 8 },
  { x: 'CP2', y: 5 },
];

const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
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
  },
  {
    x: '决策平台',
    y: 2341,
  },
  {
    x: '非结构化平台',
    y: 1231,
  },
  {
    x: '权限平台',
    y: 1231,
  },
  {
    x: '自开发平台',
    y: 1000,
  },
  {
    x: '其它',
    y: 400,
  },
];

const salesTypeDataOnline = [
  {
    x: 'ERP',
    y: 244,
  },
  {
    x: 'WebLogic',
    y: 321,
  },
  {
    x: 'WebSphere',
    y: 311,
  },
  {
    x: 'Oracle',
    y: 41,
  },
  {
    x: 'SQL Server',
    y: 121,
  },
  {
    x: 'SharePoint',
    y: 41,
  },
  {
    x: '其它',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: 'ERP',
    y: 99,
  },
  {
    x: '数据库',
    y: 188,
  },
  {
    x: 'WEB服务器',
    y: 344,
  },
  {
    x: '中间件',
    y: 255,
  },
  {
    x: '其它',
    y: 65,
  },
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `门店${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

//
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

export const getFakeChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};

export default {
  getFakeChartData,
};
