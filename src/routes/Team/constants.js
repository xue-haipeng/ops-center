export const PRIORITY = [
  {character: '低', style: { color: '#aaa8a4', fontSize: '16px' }},
  {character: '中', style: { color: '#fadb14', fontSize: '16px' }},
  {character: '高', style: { color: '#aa4d30', fontSize: '16px' }},
];

export const SIGNIFICANCE = [
  '较低','一般','重要','非常重要',
];

export const CATEGORY = {
  'M': { name: '运维', color: '#e8ab88' },
  'I': { name: '实施', color: '#6bdd98' },
  'T': { name: '排错', color: '#f87d90' },
  'L': { name: '培训', color: '#a284dc' },
  'D': { name: '设计', color: '#35d0e6' },
  'P': { name: 'PaaS', color: '#5fb5f0' },
  'B': { name: '大数据', color: '#f68ac8' },
  'S': { name: '支持', color: '#f1af43' },
  'O': { name: '其它', color: '#abbba2' },
};

export const STATUS = [
  { name: '未开始', status: 'default' },
  { name: '进行中', status: 'processing' },
  { name: '暂停中', status: 'warning' },
  { name: '阻塞中', status: 'warning' },
  { name: '已完成', status: 'success' },
  { name: '已终止', status: 'error' },
];

export const MEMBERS = [
  '白洁',
  '曹超',
  '韩心怡',
  '何思洋',
  '胡帅',
  '姜永锐',
  '林增跃',
  '孙永辉',
  '赛旭骞',
  '文都子',
  '王茜',
  '王禹博',
  '徐冠雄',
  '徐翔',
  '薛海鹏',
  '杨科',
  '赵鑫',
  '周惟',
];

export const USER_STATUS = [
  { code: 0, name: '已激活', status: 'success' },
  { code: 1, name: '未激活', status: 'default' },
  { code: 2, name: '已锁定', status: 'error' },
  { code: 3, name: '已过期', status: 'warning' },
];

export const AUTHORITIES = [
  { code: 1, name: '管理员' },
  { code: 2, name: '普通用户' },
];
