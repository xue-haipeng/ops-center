import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Calendar, Badge } from 'antd';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Authorized from '../../utils/Authorized';
import styles from './Task.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

const havePermissionAsync = new Promise(resolve => {
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }

  getListData = value => {
    let listData;
    switch (value.date()) {
      case 4:
        listData = [
          { type: 'warning', content: '修改主机密码' },
          { type: 'success', content: '数据库安全基线巡检' },
        ];
        break;
      case 6:
        listData = [
          { type: 'warning', content: '继续修改密码' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 13:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long' },
          { type: 'error', content: 'This is error event 1.' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  getMonthData = value => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  dateCellRender = value => {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  monthCellRender = value => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="任务追踪看板" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="任务总计" suffix="项" total={numeral(124).format('0,0')} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="任务完成率" total="76%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="活动剩余时间" total={<CountDown target={targetTime} />} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="上周完成量" suffix="项" total={numeral(23).format('0,0')} />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Calendar
                  dateCellRender={this.dateCellRender}
                  monthCellRender={this.monthCellRender}
                />
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
              <TagCloud data={tags} height={161} />
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
