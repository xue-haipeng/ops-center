import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Carousel } from 'antd';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Authorized from '../../utils/Authorized';
import styles from './Performance.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

const havePermissionAsync = new Promise(resolve => {
  setTimeout(() => resolve(), 1000);
});

const options = {
  chart: {
    type: 'spline',
  },
  title: {
    text: 'BPM生产系统CPU使用率（%）',
    style: {
      fontFamily: 'Microsoft Yahei',
    },
  },
  subtitle: {
    text: '包含流程引擎与UI表单系统',
    style: {
      fontFamily: 'Microsoft Yahei',
    },
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      second: '%H:%M:%S',
      minute: '%H:%M',
      hour: '%H:%M',
    },
    title: {
      text: '',
    },
  },
  yAxis: {
    title: {
      text: 'Snow depth (m)',
    },
    min: 0,
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b}: {point.y:.2f} m',
  },

  plotOptions: {
    spline: {
      marker: {
        enabled: false,
      },
    },
  },

  colors: ['#6CF', '#39F', '#06C', '#036'],
  series: [{
    name: "Winter 2014-2015",
    data: [
      [Date.UTC(1970, 10, 25), 0],
      [Date.UTC(1970, 11, 25), 1.64],
      [Date.UTC(1971, 0, 24), 2.62],
      [Date.UTC(1971, 1,  4), 2.5],
      [Date.UTC(1971, 2,  6), 2.74],
      [Date.UTC(1971, 2, 14), 2.62],
      [Date.UTC(1971, 2, 24), 2.6],
      [Date.UTC(1971, 3, 27), 2.77],
      [Date.UTC(1971, 4,  9), 2.56],
      [Date.UTC(1971, 5, 19), 1.27],
      [Date.UTC(1971, 5, 24), 0.99],
      [Date.UTC(1971, 6,  3), 0.18],
      [Date.UTC(1971, 6,  4), 0],
    ],
  }, {
    name: "Winter 2015-2016",
    data: [
      [Date.UTC(1970, 10,  9), 0],
      [Date.UTC(1970, 10, 15), 0.23],
      [Date.UTC(1970, 10, 20), 0.25],
      [Date.UTC(1970, 10, 25), 0.23],
      [Date.UTC(1970, 10, 30), 0.39],
      [Date.UTC(1970, 11,  5), 0.41],
      [Date.UTC(1970, 11, 10), 0.59],
      [Date.UTC(1970, 11, 15), 0.73],
      [Date.UTC(1970, 11, 20), 0.41],
      [Date.UTC(1970, 11, 25), 1.07],
      [Date.UTC(1970, 11, 30), 0.88],
      [Date.UTC(1971, 0,  5), 0.85],
      [Date.UTC(1971, 0, 11), 0.89],
      [Date.UTC(1971, 0, 17), 1.04],
      [Date.UTC(1971, 0, 20), 1.02],
      [Date.UTC(1971, 0, 25), 1.03],
      [Date.UTC(1971, 0, 30), 1.39],
      [Date.UTC(1971, 1,  5), 1.77],
      [Date.UTC(1971, 1, 26), 2.12],
      [Date.UTC(1971, 3, 19), 2.1],
      [Date.UTC(1971, 4,  9), 1.7],
      [Date.UTC(1971, 4, 29), 0.85],
      [Date.UTC(1971, 5,  7), 0],
    ],
  }, {
    name: "Winter 2016-2017",
    data: [
      [Date.UTC(1970, 9, 15), 0],
      [Date.UTC(1970, 9, 31), 0.09],
      [Date.UTC(1970, 10,  7), 0.17],
      [Date.UTC(1970, 10, 10), 0.1],
      [Date.UTC(1970, 11, 28), 0.37],
      [Date.UTC(1971, 0, 16), 0.68],
      [Date.UTC(1971, 0, 31), 0.43],
      [Date.UTC(1971, 1,  4), 0.42],
      [Date.UTC(1971, 2,  4), 0.68],
      [Date.UTC(1971, 2,  7), 0.65],
      [Date.UTC(1971, 2, 30), 0.98],
      [Date.UTC(1971, 3, 27), 1.18],
      [Date.UTC(1971, 3, 30), 1.12],
      [Date.UTC(1971, 4,  3), 1.06],
      [Date.UTC(1971, 4,  6), 0.96],
      [Date.UTC(1971, 4,  9), 0.87],
      [Date.UTC(1971, 4, 12), 0.88],
      [Date.UTC(1971, 4, 15), 0.79],
      [Date.UTC(1971, 4, 18), 0.54],
      [Date.UTC(1971, 4, 21), 0.34],
    ],
  }],
};

@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Performance extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetch',
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { keySysCpuUtlz } = monitor;

    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="重点业务系统主机CPU负载" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="今日交易总额"
                    suffix="元"
                    total={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="销售目标完成率" total="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="活动剩余时间" total={<CountDown target={targetTime} />} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="每秒交易总额"
                    suffix="元"
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip title="等待后期实现">
                  <Carousel autoplay arrows dots className={styles.antCarousel}>
                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                      />
                    </div>
                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                      />
                    </div>
                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                      />
                    </div>
                  </Carousel>
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card title="活动情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            <Card
              title="券核效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge title="跳出率" height={180} percent={87} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card title="各品类占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="中式快餐"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle="西餐"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle="火锅"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="热门搜索"
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={keySysCpuUtlz} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="资源剩余"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} title="补贴资金剩余" percent={34} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
