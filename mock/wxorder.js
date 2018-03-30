import { getUrlParams } from './utils';

let tableListDataSource =
  [
    {
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
    },
    {
      createdTime: 1521101971000,
      updatedTime: 1521102288000,
      id: 103099,
      userId: null,
      amount: 0.11,
      state: 1,
      dateTime: 1521102195000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1521102033000,
          updatedTime: 1521102033000,
          id: 4791,
          orderId: 103099,
          apiId: 252,
          name: '晴天',
          providerId: 'wanxiangzheng',
          unitPrice: 0.11,
          unitCount: 1,
          num: 1,
          chargeType: 0,
          categoryId: 16,
          type: 1,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥0.11',
        },
      ],
      fuwuOrderId: 10006218,
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
      serviceCode: 'FW_GOODS-471208',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18900000000',
    },
    {
      createdTime: 1521098736000,
      updatedTime: 1521098944000,
      id: 103098,
      userId: null,
      amount: 1.0,
      state: 1,
      dateTime: 1521098851000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1521098808000,
          updatedTime: 1521098808000,
          id: 4790,
          orderId: 103098,
          apiId: 251,
          name: '数据报告下载',
          providerId: 'wanxiangzheng',
          unitPrice: 1.0,
          unitCount: 1,
          num: 1,
          chargeType: 0,
          categoryId: 16,
          type: 2,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥1.00',
        },
      ],
      fuwuOrderId: 10006217,
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
      serviceCode: 'FW_GOODS-471207',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18900000000',
    },
    {
      createdTime: 1520928835000,
      updatedTime: 1520929013000,
      id: 103082,
      userId: null,
      amount: 1.0,
      state: 1,
      dateTime: 1520928922000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1520928895000,
          updatedTime: 1520928895000,
          id: 4774,
          orderId: 103082,
          apiId: 245,
          name: '130新建',
          providerId: 'wanxiangzheng',
          unitPrice: 1.0,
          unitCount: 1,
          num: 1,
          chargeType: 0,
          categoryId: 17,
          type: 1,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥1.00',
        },
      ],
      fuwuOrderId: 10006208,
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
      serviceCode: 'FW_GOODS-467609',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18900000000',
    },
    {
      createdTime: 1520928404000,
      updatedTime: 1520928603000,
      id: 103080,
      userId: null,
      amount: 1.0,
      state: 1,
      dateTime: 1520928511000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1520928456000,
          updatedTime: 1520928456000,
          id: 4772,
          orderId: 103080,
          apiId: 245,
          name: '130新建',
          providerId: 'wanxiangzheng',
          unitPrice: 1.0,
          unitCount: 1,
          num: 1,
          chargeType: 0,
          categoryId: 17,
          type: 1,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥1.00',
        },
      ],
      fuwuOrderId: 10006207,
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
      isvPin: 'wuyu017',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-467609',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '13312345678',
    },
    {
      createdTime: 1520925449000,
      updatedTime: 1520925730000,
      id: 103078,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1520925638000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1520925509000,
          updatedTime: 1520925509000,
          id: 4770,
          orderId: 103078,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006205,
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
      isvPin: 'wuyu016',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: null,
    },
    {
      createdTime: 1520825808000,
      updatedTime: 1520826330000,
      id: 103058,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1520826240000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1520825839000,
          updatedTime: 1520825839000,
          id: 4751,
          orderId: 103058,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006201,
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
      isvPin: 'wuyu016',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: null,
    },
    {
      createdTime: 1519980906000,
      updatedTime: 1519981083000,
      id: 103038,
      userId: null,
      amount: 10.0,
      state: 1,
      dateTime: 1519981003000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1519980944000,
          updatedTime: 1519980944000,
          id: 4731,
          orderId: 103038,
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
      fuwuOrderId: 10006030,
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
    },
    {
      createdTime: 1519885279000,
      updatedTime: 1519885516000,
      id: 103036,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1519885437000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1519885345000,
          updatedTime: 1519885345000,
          id: 4729,
          orderId: 103036,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006029,
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
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18900000000',
    },
    {
      createdTime: 1519884960000,
      updatedTime: 1519885304000,
      id: 103032,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1519885226000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1519885021000,
          updatedTime: 1519885021000,
          id: 4725,
          orderId: 103032,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006028,
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
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18900000000',
    },
    {
      createdTime: 1519721925000,
      updatedTime: 1519722065000,
      id: 103019,
      userId: null,
      amount: 1.0,
      state: 1,
      dateTime: 1519721988000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1519721958000,
          updatedTime: 1519721958000,
          id: 4712,
          orderId: 103019,
          apiId: 137,
          name: 'aaaaaa',
          providerId: 'wanxiang2015',
          unitPrice: 1.0,
          unitCount: 1,
          num: 1,
          chargeType: 2,
          categoryId: 5,
          type: 3,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥1.00',
        },
      ],
      fuwuOrderId: 10006023,
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
      isvPin: 'gxm2016',
      ispPin: 'wanxiang2015',
      serviceCode: 'FW_GOODS-471192',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '神州伟智（天津）科技有限公司',
      fuwuStatusList: null,
      mobile: '18910917492',
    },
    {
      createdTime: 1518425202000,
      updatedTime: 1518425524000,
      id: 103011,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1518425462000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1518425209000,
          updatedTime: 1518425209000,
          id: 4704,
          orderId: 103011,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006021,
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
      isvPin: 'gxm2016',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18910917492',
    },
    {
      createdTime: 1517905100000,
      updatedTime: 1517920354000,
      id: 102980,
      userId: null,
      amount: 50.0,
      state: 1,
      dateTime: 1517920298000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1517905133000,
          updatedTime: 1517905133000,
          id: 4673,
          orderId: 102980,
          apiId: 953,
          name: '2018地图数据',
          providerId: 'today1235',
          unitPrice: 50.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 54,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥50.00/5次',
        },
      ],
      fuwuOrderId: 10006004,
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
      isvPin: 'wanxiangd5',
      ispPin: 'today1235',
      serviceCode: 'FW_GOODS-464795',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '万象科技1235',
      fuwuStatusList: null,
      mobile: '18813083713',
    },
    {
      createdTime: 1517911581000,
      updatedTime: 1517911665000,
      id: 102993,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1517911609000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1517911620000,
          updatedTime: 1517911620000,
          id: 4686,
          orderId: 102993,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006011,
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
      isvPin: 'wanxianga24',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18813083713',
    },
    {
      createdTime: 1517911380000,
      updatedTime: 1517911476000,
      id: 102991,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1517911421000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1517911412000,
          updatedTime: 1517911412000,
          id: 4684,
          orderId: 102991,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006010,
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
      isvPin: 'wanxianga24',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18813083713',
    },
    {
      createdTime: 1517905943000,
      updatedTime: 1517906032000,
      id: 102981,
      userId: null,
      amount: 500.0,
      state: 1,
      dateTime: 1517905977000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1517905976000,
          updatedTime: 1517905976000,
          id: 4674,
          orderId: 102981,
          apiId: 954,
          name: '26岁',
          providerId: 'wanxiangzheng',
          unitPrice: 500.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 18,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥500.00/5次',
        },
      ],
      fuwuOrderId: 10006005,
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
      isvPin: 'wanxiangd5',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-467614',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18813083713',
    },
    {
      createdTime: 1517822275000,
      updatedTime: 1517822519000,
      id: 102977,
      userId: null,
      amount: 50.0,
      state: 1,
      dateTime: 1517822465000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1517822303000,
          updatedTime: 1517822303000,
          id: 4670,
          orderId: 102977,
          apiId: 953,
          name: '2018地图数据',
          providerId: 'today1235',
          unitPrice: 50.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 54,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥50.00/5次',
        },
      ],
      fuwuOrderId: 10006003,
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
      isvPin: 'wanxiang2015',
      ispPin: 'today1235',
      serviceCode: 'FW_GOODS-464795',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '万象科技1235',
      fuwuStatusList: null,
      mobile: '13651127519',
    },
    {
      createdTime: 1517819959000,
      updatedTime: 1517820177000,
      id: 102976,
      userId: null,
      amount: 50.0,
      state: 1,
      dateTime: 1517820122000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1517819986000,
          updatedTime: 1517819986000,
          id: 4669,
          orderId: 102976,
          apiId: 953,
          name: '2018地图数据',
          providerId: 'today1235',
          unitPrice: 50.0,
          unitCount: 5,
          num: 1,
          chargeType: 0,
          categoryId: 54,
          type: 0,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥50.00/5次',
        },
      ],
      fuwuOrderId: 10006002,
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
      isvPin: 'wanxiang2015',
      ispPin: 'today1235',
      serviceCode: 'FW_GOODS-464795',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '万象科技1235',
      fuwuStatusList: null,
      mobile: '13651127519',
    },
    {
      createdTime: 1515579381000,
      updatedTime: 1515579429000,
      id: 102852,
      userId: null,
      amount: 5000.0,
      state: 1,
      dateTime: 1515579104000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1515579259000,
          updatedTime: 1515579259000,
          id: 4547,
          orderId: 102852,
          apiId: 123,
          name: '鸟巢中心应用',
          providerId: 'wanxiangzheng',
          unitPrice: 5000.0,
          unitCount: 180,
          num: 1,
          chargeType: 1,
          categoryId: 54,
          type: 3,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥5000.00/半年',
        },
      ],
      fuwuOrderId: 10001814,
      payUrl: null,
      isInvoice: 0,
      expressName: '顺丰',
      expressNum: '111',
      pk: null,
      tradeHash: null,
      orderType: null,
      invoiceCode: null,
      invoiceNumber: null,
      invoiceType: 0,
      orderUserSource: null,
      blockMd5: null,
      orderPic: null,
      isvPin: 'wanxianga23',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-452602',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18245697855',
    },
    {
      createdTime: 1515571384000,
      updatedTime: 1515579020000,
      id: 102791,
      userId: null,
      amount: 1000.0,
      state: 1,
      dateTime: 1515578695000,
      orderTime: null,
      goodsList: [
        {
          createdTime: 1515571286000,
          updatedTime: 1515571286000,
          id: 4486,
          orderId: 102791,
          apiId: 121,
          name: '鸟巢中心应用',
          providerId: 'wanxiangzheng',
          unitPrice: 1000.0,
          unitCount: 90,
          num: 1,
          chargeType: 1,
          categoryId: 54,
          type: 3,
          activityId: 0,
          giftActivityID: 0,
          payType: 0,
          chargeStr: '￥1000.00/季',
        },
      ],
      fuwuOrderId: 10001807,
      payUrl: null,
      isInvoice: 0,
      expressName: '顺丰',
      expressNum: '1111',
      pk: null,
      tradeHash: null,
      orderType: null,
      invoiceCode: null,
      invoiceNumber: null,
      invoiceType: 0,
      orderUserSource: null,
      blockMd5: null,
      orderPic: null,
      isvPin: 'wanxianga23',
      ispPin: 'wanxiangzheng',
      serviceCode: 'FW_GOODS-452601',
      startTime: null,
      endTime: null,
      startDateTime: null,
      endDateTime: null,
      pageSize: null,
      companyName: '好久不见',
      fuwuStatusList: null,
      mobile: '18245697855',
    },
  ];

export function getOrder(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url;
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

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
    state.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.state, 10) === parseInt(s[0], 10))
      );
    });
  }
  if (params.isvPin) {
    const isvPin = params.isvPin.split(',');
    let filterDataSource = [];
    isvPin.forEach((pin) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.isvPin.indexOf(pin) > -1)
      );
    });
    dataSource = filterDataSource;
  }

  if (params.fuwuOrderId) {
    dataSource = dataSource.filter(data =>
      parseInt(data.fuwuOrderId, 10) === parseInt(params.fuwuOrderId, 10));
  }

  if (params.dateTime && params.dateTime.indexOf(' - ') > -1) {
    const startTime = params.dateTime.split(' - ')[0];
    const endTime = params.dateTime.split(' - ')[1];
    dataSource = dataSource.filter(data => data.dateTime > startTime && data.dateTime < endTime);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
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

export function postOrder(req, res, u, b) {
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
  getOrder,
  postOrder,
};
