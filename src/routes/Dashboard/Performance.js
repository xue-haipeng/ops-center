import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Carousel } from 'antd';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import {
  Chart,
  Geom,
  Axis,
  Tooltip as ChartTooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import Authorized from '../../utils/Authorized';
import styles from './Performance.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

const havePermissionAsync = new Promise(resolve => {
  setTimeout(() => resolve(), 1000);
});

const data = [
  {
    month: "Jan",
    Tokyo: 7.0,
    London: 3.9,
    Paris: 4.8,
  },
  {
    month: "Feb",
    Tokyo: 6.9,
    London: 4.2,
    Paris: 2.9,
  },
  {
    month: "Mar",
    Tokyo: 9.5,
    London: 5.7,
    Paris: 3.4,
  },
  {
    month: "Apr",
    Tokyo: 14.5,
    London: 8.5,
    Paris: 5.9,
  },
  {
    month: "May",
    Tokyo: 18.4,
    London: 11.9,
    Paris:12.4,
  },
  {
    month: "Jun",
    Tokyo: 21.5,
    London: 15.2,
    Paris: 17.8,
  },
  {
    month: "Jul",
    Tokyo: 25.2,
    London: 17.0,
    Paris: 18.2,
  },
  {
    month: "Aug",
    Tokyo: 26.5,
    London: 16.6,
    Paris: 15.2,
  },
  {
    month: "Sep",
    Tokyo: 23.3,
    London: 14.2,
    Paris: 12.5,
  },
  {
    month: "Oct",
    Tokyo: 18.3,
    London: 10.3,
    Paris: 9.8,
  },
  {
    month: "Nov",
    Tokyo: 13.9,
    London: 6.6,
    Paris: 6.5,
  },
  {
    month: "Dec",
    Tokyo: 9.6,
    London: 4.8,
    Paris: 5.5,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: "fold",
  fields: ["Tokyo", "London", "Paris"],
  key: "city",
  value: "temperature",
});
console.log(dv);
const cols = {
  time: {
    range: [0, 1],
  },
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
                  <Carousel autoplay className={styles.antCarousel}>
                    <div>
                      <Chart height={400} data={keySysCpuUtlz} scale={cols} forceFit>
                        <Legend />
                        <Axis name="month" />
                        <Axis
                          name="temperature"
                          label={{
                            formatter: val => `${val}°C`,
                          }}
                        />
                        <ChartTooltip
                          crosshairs={{
                            type: "y",
                          }}
                        />
                        <Geom
                          type="line"
                          position="month*temperature"
                          size={2}
                          color="city"
                          shape="smooth"
                        />
                        {/* <Geom
                          type="point"
                          position="month*temperature"
                          size={4}
                          shape="circle"
                          color="city"
                          style={{
                            stroke: "#fff",
                            lineWidth: 1,
                          }}
                        /> */}
                      </Chart>
                    </div>
                    <div>
                      <Chart height={400} data={dv} scale={cols} forceFit>
                        <Legend />
                        <Axis name="month" />
                        <Axis
                          name="temperature"
                          label={{
                            formatter: val => `${val}°C`,
                          }}
                        />
                        <ChartTooltip
                          crosshairs={{
                            type: "y",
                          }}
                        />
                        <Geom
                          type="line"
                          position="month*temperature"
                          size={2}
                          color="city"
                          shape="smooth"
                        />
                        {/* <Geom
                          type="point"
                          position="month*temperature"
                          size={4}
                          shape="circle"
                          color="city"
                          style={{
                            stroke: "#fff",
                            lineWidth: 1,
                          }}
                        /> */}
                      </Chart>
                    </div>
                    <div>
                      <Chart height={400} data={dv} scale={cols} forceFit>
                        <Legend />
                        <Axis name="month" />
                        <Axis
                          name="temperature"
                          label={{
                            formatter: val => `${val}°C`,
                          }}
                        />
                        <ChartTooltip
                          crosshairs={{
                            type: "y",
                          }}
                        />
                        <Geom
                          type="line"
                          position="month*temperature"
                          size={2}
                          color="city"
                          shape="smooth"
                        />
                        {/* <Geom
                          type="point"
                          position="month*temperature"
                          size={4}
                          shape="circle"
                          color="city"
                          style={{
                            stroke: "#fff",
                            lineWidth: 1,
                          }}
                        /> */}
                      </Chart>
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
