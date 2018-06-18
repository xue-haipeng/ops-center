import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { getHosts, postHosts } from './mock/app';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
/*  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
      mobile: 13651127519,
      mail: 'xuehaipeng@jd.com',
      team: '设计师小组',
      access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjI1ODUyMDIsInVzZXJfbmFtZSI6Inh1ZSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJlOWM4NTg2NS01MTgyLTQ1ZmEtYTZkOS1kMDgxMmRiY2Y4NDAiLCJjbGllbnRfaWQiOiJ1YWEtc2VydmljZSIsInNjb3BlIjpbInNlcnZpY2UiXX0.LPc7LbN9gpK80iJCw7XTSwZgWteRTY3keR7LRdZgJWoMx0lVG2P137JaUzVZS1gUVYIv7Iu41XDqMAaN1iwtI6_3jPVcvTqbkBFHjI1C3ap685_gJjqrolRmvbojrOQ94FwXZGBBStSIBEy6Y3nK6Eu34dxQvTdJFap2SEENdZbh2qzR0j5dCL__aaAu3m-0KoF9NQoz51Zx3Hk9PIvAIhGBPFdhbhY-TjaLjahMa4sqiJb0eepeMGGlIKVcrvrncTk_45YNivpQTX-frz_Zj-GRko8UgNMq7yh7ncsqdCpZIc8coNaQ-E4eBkPunxGCFpVzuA2ijHg0nHmUFQpJgQ',
      refresh_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ4dWUiLCJzY29wZSI6WyJzZXJ2aWNlIl0sImF0aSI6ImU5Yzg1ODY1LTUxODItNDVmYS1hNmQ5LWQwODEyZGJjZjg0MCIsImV4cCI6MTUyNTE3MzYwMiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImFlYWVkM2JhLTE3ZTItNGU5MC05NTBkLTVhOTBkNDQyN2M3NCIsImNsaWVudF9pZCI6InVhYS1zZXJ2aWNlIn0.PN72cCkQ9c1WwrqYPwoQnp3Ta7xRH_wDbTY6W-0iA5MtDSqNgkT9D9Y-j_E5jGKyAlVGRw-fqNpsy8BspKQd-r8hu_alm_Xpzo9IJM-a1-7hLiaJrt6SvQuk1Y58hgFFb3ImFXVWwLBPivwB6n_4gOaeM92JAhitL1PLpDL-jOO8vylC-VGuajx68ofsh_meKrQDctejGTb6IgJ2MSmm6OMwgkY--G2jjpIyU-j6yLBHQOAAik5XWZ2Sv031AaXnzWsdG5_cxmUSzi_kFdyeTFT6onAsB6nP5NtukGozjOws9Txar479zMZzWSs7SOKarZBlYRU5sz5P7vb4EneRTg',
    },
  },*/
  // GET POST 可省略
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'GET /api/app/hosts': getHosts,
  'POST /api/app/hosts': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postHosts,
  },
  'POST /api/login/account': (req, res) => {
    const { password, username, type } = req.body;
    if(password === '888888' && username === 'admin'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'ROLE_ADMIN'
      });
      return ;
    }
    if(password === '123456' && username === 'user'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'ROLE_USER'
      });
      return ;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'ROLE_GUEST'
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Forbidden",
      "message": "Forbidden",
      "path": "/base/category/list"
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      "timestamp": 1513932555104,
      "status": 401,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
};

export default noProxy ? {} : delay(proxy, 1000);
