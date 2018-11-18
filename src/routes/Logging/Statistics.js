import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
} from 'antd';
import {
  Pie,
} from 'components/Charts';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styles from './Statistics.less';
import HighchartsArea from '../../components/Charts/HighchartsArea';

@connect(({ chart, user, loading }) => ({
  chart,
  user,
  loading: loading.effects['chart/fetch'],
}))
export default class Statistics extends Component {

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

  render() {
    const { chart, user: { currentUser }, loading } = this.props;
    const {
      wlsLastHourDistr,
      hostDistrType,
      logCountChartList,
    } = chart;

    const formatedWlsLastHourDir = {
      beaCodeDistr: [],
      userIdDistr: [],
      bizLineDistr: [],
      severityDistr: [],
      serverDistr: [],
      subSysDistr: [],
    };
// eslint-disable-next-line guard-for-in
    for (const obj in wlsLastHourDistr) {
      for (const item in wlsLastHourDistr[obj]) {
        if (item !== 'BEA-050001') {
          const arr = formatedWlsLastHourDir[obj];
          if (arr.length < 3) {
            arr.push({
              x: item,
              y: wlsLastHourDistr[obj][item],
            })
          } else if (arr.length === 3) {
            arr.push({
              x: 'Others',
              y: wlsLastHourDistr[obj][item],
            })
          } else {
            arr[4].y += wlsLastHourDistr[obj][item];
          }
        }
      }
    }

    const {
      beaCodeDistr,
      userIdDistr,
      bizLineDistr,
      severityDistr,
      serverDistr,
      subSysDistr,
    } = formatedWlsLastHourDir;

    const areaChartData = logCountChartList.map(item => {
      const date = item.x.split("T")[0];
      const time = item.x.split("T")[1];
      return [
        Date.UTC(
          date.split("-")[0],
          date.split("-")[1],
          date.split("-")[2],
          time.split(":")[0],
          time.split(":")[1],
          time.split(":")[2]),
        item.y];
    });

    return (
      <Fragment>
        <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          title="OSB系统日志挖掘（最近1小时 / 每10分钟更新）"
          bodyStyle={{ padding: '20px' }}
          style={{ background: 'transparent' }}
        >
          {beaCodeDistr && bizLineDistr && (
            <Row gutter={24} style={{ paddingBottom: 24 }}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Pie
                  hasLegend
                  subTitle="BEA Code分布"
                  style={{ background: '#ffffff' }}
                  total={beaCodeDistr.map(item => item.y).reduce((prev, curr) => prev + curr, 0)}
                  data={beaCodeDistr}
                  height={180}
                />
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Pie
                  hasLegend
                  title="业务域分布"
                  subTitle="业务域分布"
                  style={{ background: '#ffffff' }}
                  total={bizLineDistr.map(item => item.y).reduce((prev, curr) => prev + curr, 0)}
                  data={bizLineDistr}
                  height={180}
                />
              </Col>
            </Row>
          )}
          <Row gutter={24} style={{ paddingBottom: 24 }}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Pie
                hasLegend
                title="用户ID分布"
                subTitle="用户ID分布"
                style={{ background: '#ffffff' }}
                total={userIdDistr.map(item => item.y).reduce((prev, curr) => prev + curr, 0)}
                data={userIdDistr}
                height={180}
              />
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Pie
                hasLegend
                title="Server分布"
                subTitle="Server分布"
                style={{ background: '#ffffff' }}
                total={serverDistr.map(item => item.y).reduce((prev, curr) => prev + curr, 0)}
                data={serverDistr}
                height={180}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Pie
                hasLegend
                title="严重级分布"
                subTitle="严重级分布"
                style={{ background: '#ffffff' }}
                total={severityDistr.map(item => item.y).reduce((prev, curr) => prev + curr, 0)}
                data={severityDistr}
                height={180}
              />
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Pie
                hasLegend
                title="子模块分布"
                subTitle="子模块分布"
                style={{ background: '#ffffff' }}
                total={subSysDistr.map(item => item.y).reduce((prev, curr) => prev + curr, 0)}
                data={subSysDistr}
                height={180}
              />
            </Col>
          </Row>
        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="日志生成量变化趋势（最近24小时）"
              style={{ minHeight: 490 }}
            >
              <HighchartsArea data={areaChartData} />
            </Card>
          </Col>
          {/* <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="日志生成量分布（最近1小时 / 每10分钟更新）"
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 370 }}
            >
              <Pie
                hasLegend
                subTitle="日志条数"
                total={() => `${hostDistrType && hostDistrType.reduce((pre, now) => now.y + pre, 0)}`}
                data={hostDistrType}
                valueFormat={value => `${value}`}
                height={200}
                lineWidth={4}
                style={{ marginTop: 30 }}
              />
            </Card>
          </Col> */}
        </Row>
      </Fragment>
    );
  }
}
