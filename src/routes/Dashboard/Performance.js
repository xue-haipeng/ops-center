/* eslint-disable guard-for-in,prefer-const */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tabs, Tooltip, Icon, Table } from 'antd';
import Authorized from '../../utils/Authorized';
import styles from './Performance.less';
import HighchartsSpline from '../../components/Charts/HighchartsSpline';
import { KEY_SYS_PREFIX_LIST } from './constant';
import numeral from 'numeral';
import { Radio } from 'antd/lib/radio';

const { Secured } = Authorized;
// eslint-disable-next-line prefer-destructuring
const TabPane = Tabs.TabPane;

/* const havePermissionAsync = new Promise(resolve => {
  setTimeout(() => resolve(), 1000);
});

@Secured(havePermissionAsync) */
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
    const { keySysCpuUtlz, vmDiskUsage, tbsUsageTabData } = monitor;

    const topCpuHosts = [];

    for (let prefix in keySysCpuUtlz) {
      for (let index in keySysCpuUtlz[prefix]) {
        const { name, data } = keySysCpuUtlz[prefix][index];
        // console.log('arr: ', arr);
        const item = {name, rate: data[data.length - 1][1]};
        topCpuHosts.push(item);
      }
    }

    const columns = [
      {
        title: 'IP地址',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
      },
      {
        title: '主机名称',
        dataIndex: 'hostname',
        key: 'hostname',
      },
      {
        title: '磁盘分区',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '使用率',
        dataIndex: 'percent',
        key: 'percent',
      },
    ];

    const tbsCols = [
      {
        title: 'IP地址',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: 'SID',
        dataIndex: 'sid',
        key: 'sid',
      },
      {
        title: '表空间',
        dataIndex: 'rs.name',
        key: 'rs.name',
      },
      {
        title: '空闲空间',
        dataIndex: 'rs.used_mb',
        key: 'rs.used_mb',
        render: txt => `${numeral(txt / 1024).format('0,0')}GB`,
      },
      {
        title: '使用率',
        dataIndex: 'rs.used_percent',
        key: 'rs.used_percent',
      },
    ];

    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 12 }}>
            <Card
              title="重点业务系统主机CPU负载（最近6小时）"
              bordered={false}
            >
              <div>
                <Tabs
                  defaultActiveKey="1"
                  tabPosition="top"
                  style={{ height: 450 }}
                  type="card"
                >
                  {keySysCpuUtlz && Object.keys(keySysCpuUtlz).map(prefix => keySysCpuUtlz[prefix] && keySysCpuUtlz[prefix].length > 0 && (
                    <TabPane tab={KEY_SYS_PREFIX_LIST[prefix]} key={prefix}>
                      <HighchartsSpline formatedData={keySysCpuUtlz[prefix]} />
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="重点系统当前CPU使用率"
              loading={loading}
              style={{ marginBottom: 12 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <div className={styles.salesRank}>
                <ul className={styles.rankingList}>
                  {topCpuHosts && topCpuHosts.sort((a, b) => b.rate - a.rate).slice(0, 14).map((item, i) => (
                    <li key={item.name}>
                      <span className={i < 5 ? styles.active : ''}>{i + 1}</span>
                      <span>{item.name}</span>
                      <span>{`${item.rate}%`}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <Gauge title="跳出率" height={180} percent={7} /> */}
              {/* <HighchartsGauge percent={20} /> */}
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="当前虚机本地磁盘使用情况（超过90%）"
              style={{ marginTop: 12 }}
            >
              <Table
                rowKey={record => record.ipAddress + record.path}
                size="small"
                columns={columns}
                dataSource={vmDiskUsage}
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
              bordered={false}
              title="当前Oracle数据库表空间使用情况（不含系统表空间）"
              style={{ marginTop: 12 }}
            >
              <Table
                rowKey={record => record.sid + record.rs.name}
                size="small"
                columns={tbsCols}
                dataSource={tbsUsageTabData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
