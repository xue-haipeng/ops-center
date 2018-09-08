import { isUrl } from '../utils/utils';
import userGroup from '../assets/ico-user-group-on.svg'

const menuData = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '综合报表',
        path: 'analysis',
      },
      {
        name: '性能监控',
        path: 'performance',
      },
/*      {
              name: '任务看板',
              path: 'task',
            },
            {
              name: '备份巡检',
              path: 'backup',
            }, */
      /*      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      }, */
    ],
  },
  {
    name: '团队管理',
    icon: 'user',
    path: 'team',
    children: [
      {
        name: '重点任务跟踪',
        path: 'task',
      },
      {
        name: '用户管理',
        authority: ['ROLE_ADMIN'],
        path: 'user',
      },
    ],
  },
  /*    {
      name: '日常监控',
      icon: 'form',
      path: 'monitor',
      children: [
        {
          name: '应用状态监控',
          path: 'app-status',
        },
        {
          name: '数据库监控',
          path: 'database',
        },
        {
          name: '系统备份监控',
          path: 'backup',
        },
        {
          name: 'CPU使用率监控',
          path: 'cpu',
        },
        {
          name: '磁盘空间监控',
          path: 'disk',
        },
      ],
    },
    {
      name: '表单页',
      icon: 'form',
      path: 'form',
      children: [
        {
          name: '基础表单',
          path: 'basic-form',
        },
        {
          name: '分步表单',
          path: 'step-form',
        },
        {
          name: '高级表单',
          authority: ['ROLE_ADMIN', 'ROLE_USER'],
          path: 'advanced-form',
        },
      ],
    },
    {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [
        {
          name: '查询表格',
          path: 'table-list',
        },
        {
          name: '标准列表',
          path: 'basic-list',
        },
        {
          name: '卡片列表',
          path: 'card-list',
        },
        {
          name: '搜索列表',
          path: 'search',
          children: [
            {
              name: '搜索列表（文章）',
              path: 'articles',
            },
            {
              name: '搜索列表（项目）',
              path: 'projects',
            },
            {
              name: '搜索列表（应用）',
              path: 'applications',
            },
          ],
        },
      ],
    },
    {
      name: '详情页',
      icon: 'profile',
      path: 'profile',
      children: [
        {
          name: '基础详情页',
          path: 'basic',
        },
        {
          name: '高级详情页',
          path: 'advanced',
          authority: ['ROLE_ADMIN', 'ROLE_USER'],
        },
        {
          name: '个人定制',
          path: 'custom',
        },
      ],
    }, */
  {
    name: '应用管理',
    icon: 'api',
    path: 'app',
    children: [
      {
        name: '主机管理',
        path: 'hosts',
      },
    ],
  },
  /*  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: ['ROLE_USER'],
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  }, */
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
