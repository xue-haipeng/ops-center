import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import styles from './Analysis.less';

const { TabPane } = Tabs;

const rankingListData = [
  { hostname: 'HP1', rate: 11.10 },
  { hostname: 'CPF', rate: 9.77 },
  { hostname: 'CP2', rate: 6.55 },
  { hostname: 'ZHDP5', rate: 44 },
];

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
    hostDistrTypeSelected: 'platform',
    currHours: 2,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeHostDistrType = e => {
    this.setState({
      hostDistrTypeSelected: e.target.value,
    });
    this.props.dispatch({
      type: 'chart/fetchHostsDistrType',
      payload: e.target.value,
    });
  };

/*  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchAscsCpuCurr',
    });
  }; */

  selectHours = hours => {
    this.setState({
      currHours: hours,
    });
    this.props.dispatch({
      type: 'chart/fetchNHoursHostsCpuAvg7',
      payload: hours,
    });
  };

  isActive(hours) {
    if (this.state.currHours === hours) {
      return styles.currentDate;
    }
  }

  render() {
    const { hostDistrTypeSelected } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      ascsCpuCurr,
      nHoursHostsCpuAvg7,
      searchData,
      hostDistrType,
    } = chart;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive(2)} onClick={() => this.selectHours(2)}>
            2小时
          </a>
          <a className={this.isActive(4)} onClick={() => this.selectHours(4)}>
            4小时
          </a>
          <a className={this.isActive(6)} onClick={() => this.selectHours(6)}>
            6小时
          </a>
          <a className={this.isActive(12)} onClick={() => this.selectHours(12)}>
            12小时
          </a>
        </div>
        { /*  <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        /> */}
      </div>
    );

    const columns = [
      {
        title: '系统名称',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '前日',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: '昨日',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '今日',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="示例指标"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => 126560}
              footer={<Field label="虚机总计" value={`${numeral(2423).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                告警<span className={styles.trendText}>85</span>
              </Trend>
              <Trend flag="down">
                健康<span className={styles.trendText}>1979</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="日志生成量"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比<span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    日环比<span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="示例指标"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(6560).format('0,0')}
              footer={<Field label="示例说明" value="60%" />}
              contentHeight={46}
            >
              <MiniBar data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="本周任务完成进度"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="78%"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    月同比<span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    周环比<span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="ERP应用负载" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="当前ASCS节点CPU平均使用率（%）" data={ascsCpuCurr} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>主机CPU使用率</h4>
                      <ul className={styles.rankingList}>
                        {nHoursHostsCpuAvg7 && nHoursHostsCpuAvg7.map((item, i) => (
                          <li key={item.hostname}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.hostname}</span>
                            <span>{`${item.rate}%`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="数据库负载" key="views">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} title="当前负载（Avg Active Sessions）" data={ascsCpuCurr} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>当前数据库负载</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.hostname}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.hostname}</span>
                            <span>{`${item.rate}%`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="昨日系统备份情况"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={
                      <span>
                        备份成功数
                        <Tooltip title="近3天备份情况">
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                    }
                    gap={8}
                    total={numeral(10321).format('0,0')}
                    // status="up"
                    subTotal={<Icon type="check-circle" style={{ fontSize: 16, color: '#24cc78' }} />}
                  />
                  <MiniArea line height={45} data={visitData2} />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="备份失败数"
                    total={4}
                    // status="down"
                    subTotal={<Icon type="close-circle" style={{ fontSize: 16, color: '#e48390' }} />}
                    gap={8}
                  />
                  <MiniArea line height={45} data={visitData2} />
                </Col>
              </Row>
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="系统/主机分布"
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.hostDistrTypeRadio}>
                    <Radio.Group value={hostDistrTypeSelected} onChange={this.handleChangeHostDistrType}>
                      <Radio.Button value="platform">按平台</Radio.Button>
                      {/* <Radio.Button value="businessLine">按业务线</Radio.Button> */}
                      <Radio.Button value="nodeType">按主机类型</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            >
              {/* <h4 style={{ marginTop: 8, marginBottom: 32 }}>主机分布</h4> */}
              <Pie
                hasLegend
                subTitle="主机总数"
                total={() => `${hostDistrType && hostDistrType.reduce((pre, now) => now.y + pre, 0)}`}
                data={hostDistrType}
                valueFormat={value => `${value}`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>

        {/* <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    data={offlineChartData}
                    titleMap={{ y1: '客流量', y2: '支付笔数' }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card> */}
      </Fragment>
    );
  }
}
