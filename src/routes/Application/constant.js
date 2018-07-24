export const LIFECYCLE_STATUS = [
  { badge: 'default', status: '沙箱' },
  { badge: 'success', status: '开发' },
  { badge: 'processing', status: '测试' },
  { badge: 'warning', status: '生产支持' },
  { badge: 'error', status: '生产' },
  { badge: 'default', status: '容灾' },
];
export const PLATFORM_NAME = [
  'ERP平台',
  '用户平台',
  '集成平台',
  '决策支持平台',
  '非结构化平台',
  '权限平台',
  '自主开发平台',
  '其它平台',
];
export const NODE_TYPE = [
  'ASCS/SCS',
  'DI',
  'AServer/DMGR',
  'M/AppServer/应用',
  '数据库',
  'HANA/一体机',
  'Web服务器',
  'UEP管理节点',
  'UEP主应用',
];
export const BUSINESS_LINE = [
  '统建',
  '上市',
  '未上市',
  '总部',
  '油气田',
  '销售',
  '炼化',
  '人力资源',
  '天然气与管道',
  '工程建设',
  '工程技术',
  '装备制造',
  '海外',
];
export const HA_TYPE = [
  '无',
  'vSphere FT',
  'vSphere HA',
  'Oraccle RAC',
  'Oracle DataGuard/GoldenGate',
  'SQL Server AlwaysOn Failover Cluster',
  'HANA/一体机HA方案',
  '其它HA方案',
];
export const OS_RELEASE = [
  'Redhat Enterprise Linux',
  'Suse Enterprise Linux',
  'Windows Server',
  'Windows 7/8/10/XP/2003',
  'CentOS Linux',
  'Ubuntu Linux',
  '其它操作系统',
];
export const LOCATION = {
  M01: '昌平M01机房',
  M03: '昌平M03机房',
  M08: '吉林M08机房',
  M10: '吉林M10机房',
  KTY: '勘探院机房',
};

export const COMPANY = [
  '中油瑞飞',
  '规划总院',
  '大庆金桥',
  '瑞飞+规划院+金桥',
  '瑞飞+规划院',
  '瑞飞+金桥',
  '其它单位',
];
export const CURRENT_STATUS = ['正常使用', '已过期', '已停机', '已回收'];
export const APPROVER = ['付长春', '杜广源', '娄宏俊', '王茜', '其他'];
export const PROJECT_CODE = {
  D6: 'D6-总部ERP系统（含应用集成公用系统）',
  D7: 'D7-总部ERP系统（含应用集成公用系统）',
  D8: 'D8-总部ERP系统（含应用集成公用系统）',
  D12: 'D12-人力资源ERP系统',
  D13: 'D13-油气田应用集成系统（含D2-勘探与生产ERP系统、D10-油田服务ERP系统）',
  D14: 'D14-天然气与管道应用集成系统（D3-天然气与管道ERP系统）',
  D15: 'D15-炼油与化工应用集成系统（D4-炼油与化工ERP系统）',
  D16: 'D16-销售应用集成系统（含D5-销售ERP系统）',
  D17: 'D17-工程技术应用集成系统（含D7-工程技术ERP系统）',
  D18: 'D18-装备制造应用集成系统（含D8-装备制造ERP系统）',
  D19: 'D19-海外勘探开发应用集成系统（含D9-海外勘探开发ERP系统）',
  D20: 'D20-工程建设应用集成系统（含D11-工程建设ERP系统）',
};
