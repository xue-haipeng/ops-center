import { getUrlParams } from './utils';

let tableListDataSource = {
  content: [
    {
      id: 104,
      hostname: 'EUWART028',
      domainName: null,
      ipAddress: '11.11.10.58',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: '文都子',
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 105,
      hostname: 'EUWART029',
      domainName: null,
      ipAddress: '11.11.10.59',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: '杨科',
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 106,
      hostname: 'EUWART030',
      domainName: null,
      ipAddress: '11.11.10.60',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: '孙永辉',
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 107,
      hostname: 'EUWART031',
      domainName: null,
      ipAddress: '11.11.10.61',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: '杨科',
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 108,
      hostname: 'EUWART032',
      domainName: null,
      ipAddress: '11.11.10.62',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: '文都子',
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 109,
      hostname: 'EUWART033',
      domainName: null,
      ipAddress: '11.11.10.63',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: null,
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 110,
      hostname: 'EUWART034',
      domainName: null,
      ipAddress: '11.11.10.64',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: null,
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 111,
      hostname: 'EUWART035',
      domainName: null,
      ipAddress: '11.11.10.65',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: null,
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 113,
      hostname: 'EUWART037',
      domainName: null,
      ipAddress: '11.11.10.67',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: null,
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
    {
      id: 114,
      hostname: 'EUWART038',
      domainName: null,
      ipAddress: '11.11.10.68',
      systemName: 'MOSS_WEB_前端节点-生产',
      lifecycleStatus: 4,
      product: 'MOSS',
      nodeType: '4',
      projectCode: 'D6',
      platformName: '用户平台',
      businessLine: '统建',
      osRelease: null,
      isVirtualized: 1,
      haType: null,
      location: null,
      vlanId: '2040',
      applicant: null,
      approver: null,
      deliveryDate: null,
      expiredDate: null,
      currentStatus: null,
      company: null,
      maintainer: null,
      password: null,
      remarks: null,
      createTime: null,
      creator: 'xuehaipeng01',
      updateTime: '2018-06-17T12:27:51',
      reviser: null,
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
    },
    offset: 100,
    pageSize: 10,
    pageNumber: 10,
    unpaged: false,
    paged: true,
  },
  last: false,
  totalElements: 1941,
  totalPages: 195,
  number: 10,
  size: 10,
  sort: {
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 10,
  first: false,
};

export function getHosts(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = getUrlParams(url);
  console.log('urlParams: ', params);
  let dataSource = [...tableListDataSource.content];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  if (params.state) {
    const state = params.state.split(',');
    let filterDataSource = [];
    state.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.state, 10) === parseInt(s, 10))
      );
    });
    dataSource = filterDataSource;
  }
  if (params.isvPin) {
    const isvPin = params.isvPin.split(',');
    let filterDataSource = [];
    isvPin.forEach(pin => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.isvPin.indexOf(pin) > -1)
      );
    });
    dataSource = filterDataSource;
  }

  if (params.fuwuOrderId) {
    dataSource = dataSource.filter(
      data => parseInt(data.fuwuOrderId, 10) === parseInt(params.fuwuOrderId, 10)
    );
  }

  if (params.dateTime && params.dateTime.indexOf(' - ') > -1) {
    const startTime = params.dateTime.split(' - ')[0];
    const endTime = params.dateTime.split(' - ')[1];
    dataSource = dataSource.filter(data => data.dateTime > startTime && data.dateTime < endTime);
  }

  // eslint-disable-next-line prefer-destructuring
  let pageSize = parseInt(tableListDataSource.pageable.pageSize, 10);
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: tableListDataSource.totalElements,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postHosts(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'post':
      tableListDataSource.unshift({
        createdTime: 1521095493000,
        updatedTime: 1521103264000,
        id: 103096,
        userId: null,
        amount: 10.0,
        state: 1,
        dateTime: 1521103170000,
        orderTime: null,
        goodsList: [
          {
            createdTime: 1521095567000,
            updatedTime: 1521095567000,
            id: 4788,
            orderId: 103096,
            apiId: 153,
            name: '3月1号纯充值包',
            providerId: 'wanxiangzheng',
            unitPrice: 10.0,
            unitCount: 1,
            num: 1,
            chargeType: 2,
            categoryId: 16,
            type: 3,
            activityId: 0,
            giftActivityID: 0,
            payType: 0,
            chargeStr: '￥10.00',
          },
        ],
        fuwuOrderId: 10006216,
        payUrl: null,
        isInvoice: 0,
        expressName: null,
        expressNum: null,
        pk: null,
        tradeHash: null,
        orderType: null,
        invoiceCode: null,
        invoiceNumber: null,
        invoiceType: null,
        orderUserSource: null,
        blockMd5: null,
        orderPic: null,
        isvPin: 'wanxianga14',
        ispPin: 'wanxiangzheng',
        serviceCode: 'FW_GOODS-471395',
        startTime: null,
        endTime: null,
        startDateTime: null,
        endDateTime: null,
        pageSize: null,
        companyName: '好久不见',
        fuwuStatusList: null,
        mobile: '18900000000',
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getHosts,
  postHosts,
};
