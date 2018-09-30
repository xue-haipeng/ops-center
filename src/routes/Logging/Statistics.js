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

    console.log('formatedWlsLastHourDir: ', formatedWlsLastHourDir);
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

// eslint-disable-next-line prefer-destructuring
    const colors = Highcharts.getOptions().colors;
    const categories = [
            "Chrome",
            "Firefox",
            "Internet Explorer",
            "Safari",
            "Edge",
            "Opera",
            "Other",
          ];
    const data = [
            {
              "y": 62.74,
              "color": colors[2],
              "drilldown": {
                "name": "Chrome",
                "categories": [
                  "Chrome v65.0",
                  "Chrome v64.0",
                  "Chrome v63.0",
                  "Chrome v62.0",
                  "Chrome v61.0",
                  "Chrome v60.0",
                  "Chrome v59.0",
                  "Chrome v58.0",
                  "Chrome v57.0",
                  "Chrome v56.0",
                  "Chrome v55.0",
                  "Chrome v54.0",
                  "Chrome v51.0",
                  "Chrome v49.0",
                  "Chrome v48.0",
                  "Chrome v47.0",
                  "Chrome v43.0",
                  "Chrome v29.0",
                ],
                "data": [
                  0.1,
                  1.3,
                  53.02,
                  1.4,
                  0.88,
                  0.56,
                  0.45,
                  0.49,
                  0.32,
                  0.29,
                  0.79,
                  0.18,
                  0.13,
                  2.16,
                  0.13,
                  0.11,
                  0.17,
                  0.26,
                ],
              },
            },
            {
              "y": 10.57,
              "color": colors[1],
              "drilldown": {
                "name": "Firefox",
                "categories": [
                  "Firefox v58.0",
                  "Firefox v57.0",
                  "Firefox v56.0",
                  "Firefox v55.0",
                  "Firefox v54.0",
                  "Firefox v52.0",
                  "Firefox v51.0",
                  "Firefox v50.0",
                  "Firefox v48.0",
                  "Firefox v47.0",
                ],
                "data": [
                  1.02,
                  7.36,
                  0.35,
                  0.11,
                  0.1,
                  0.95,
                  0.15,
                  0.1,
                  0.31,
                  0.12,
                ],
              },
            },
            {
              "y": 7.23,
              "color": colors[0],
              "drilldown": {
                "name": "Internet Explorer",
                "categories": [
                  "Internet Explorer v11.0",
                  "Internet Explorer v10.0",
                  "Internet Explorer v9.0",
                  "Internet Explorer v8.0",
                ],
                "data": [
                  6.2,
                  0.29,
                  0.27,
                  0.47,
                ],
              },
            },
            {
              "y": 5.58,
              "color": colors[3],
              "drilldown": {
                "name": "Safari",
                "categories": [
                  "Safari v11.0",
                  "Safari v10.1",
                  "Safari v10.0",
                  "Safari v9.1",
                  "Safari v9.0",
                  "Safari v5.1",
                ],
                "data": [
                  3.39,
                  0.96,
                  0.36,
                  0.54,
                  0.13,
                  0.2,
                ],
              },
            },
            {
              "y": 4.02,
              "color": colors[5],
              "drilldown": {
                "name": "Edge",
                "categories": [
                  "Edge v16",
                  "Edge v15",
                  "Edge v14",
                  "Edge v13",
                ],
                "data": [
                  2.6,
                  0.92,
                  0.4,
                  0.1,
                ],
              },
            },
            {
              "y": 1.92,
              "color": colors[4],
              "drilldown": {
                "name": "Opera",
                "categories": [
                  "Opera v50.0",
                  "Opera v49.0",
                  "Opera v12.1",
                ],
                "data": [
                  0.96,
                  0.82,
                  0.14,
                ],
              },
            },
            {
              "y": 7.62,
              "color": colors[6],
              "drilldown": {
                "name": 'Other',
                "categories": [
                  'Other',
                ],
                "data": [
                  7.62,
                ],
              },
            },
          ];
    const browserData = [];
    const versionsData = [];
    let i;
    let j;
    const dataLen = data.length;
    let drillDataLen;
    let brightness;
// Build the data arrays
    for (i = 0; i < dataLen; i += 1) {
      // add browser data
      browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color,
      });
      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: Highcharts.Color(data[i].color).brighten(brightness).get(),
        });
      }
    }

    const options = {
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      yAxis: {
        title: {
          text: 'Total percent market share',
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
        },
      },
      tooltip: {
        valueSuffix: '%',
      },
      series: [{
        name: 'Browsers',
        data: browserData,
        size: '60%',
        dataLabels: {
          formatter () {
            return this.y > 5 ? this.point.name : null;
          },
          color: '#ffffff',
          distance: -30,
        },
      }, {
        name: 'Versions',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
          formatter () {
            // display only if larger than 1
            return this.y > 1 ? `<b>${  this.point.name  }:</b> ${ 
              this.y  }%` : null;
          },
        },
        id: 'versions',
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            series: [{
              id: 'versions',
              dataLabels: {
                enabled: false,
              },
            }],
          },
        }],
      },
    };

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
                title="用户ID分布"
                subTitle="用户ID分布"
                style={{ background: '#ffffff' }}
                total={userIdDistr.map(item => item.y).reduce((prev, curr) => prev + curr, 0)}
                data={userIdDistr}
                height={180}
              />
            </Col>
          </Row>
          <Row gutter={24} style={{ paddingBottom: 24 }}>
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
