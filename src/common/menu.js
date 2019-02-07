import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '报表管理',
    icon: 'area-chart',
    path: 'dashboard',
    children: [
      {
        name: '综合报表',
        path: 'analysis',
      },
      {
        name: '监控报表',
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
    name: '日常监控',
    icon: 'eye',
    path: 'monitoring',
    children: [
      /*        {
          name: '应用状态监控',
          path: 'app-status',
        },
        {
          name: '数据库监控',
          path: 'database',
        }, */
      {
        name: 'Oracle备份监控',
        path: 'backup',
      },
      /*        {
          name: 'CPU使用率监控',
          path: 'cpu',
        },
        {
          name: '磁盘空间监控',
          path: 'disk',
        }, */
    ],
  },
  {
    name: '应用管理',
    icon: 'cluster',
    path: 'app',
    children: [
      {
        name: '主机信息管理',
        path: 'hosts',
      },
    ],
  },
  {
    name: '日志管理',
    icon: 'file-text',
    path: 'logging',
    children: [
      {
        name: '日志统计报表',
        path: 'statistics',
      },
    ],
  },
  {
    name: 'PaaS管理',
    icon: 'cloud',
    path: 'paas',
    children: [
      {
        name: 'OpenShift POC平台管理',
        path: 'ocp',
      },
    ],
  },
  {
    name: '团队管理',
    icon: 'team',
    path: 'team',
    children: [
      {
        name: '重点任务跟踪',
        path: 'task',
      },
      {
        name: '请假管理',
        path: 'vacation',
      },
      {
        name: '用户管理',
        authority: ['ROLE_ADMIN'],
        path: 'user',
      },
    ],
  },
  {
    name: '自动化工具',
    icon: 'tool',
    path: 'tools',
    children: [
      /* {
        name: '基础表单',
        path: 'basic-form',
      }, */
      {
        name: '主机密码批量修改',
        path: 'passwd-mgt',
      },
      /* {
        name: '高级表单',
        authority: ['ROLE_ADMIN', 'ROLE_USER'],
        path: 'advanced-form',
      }, */
    ],
  },
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
