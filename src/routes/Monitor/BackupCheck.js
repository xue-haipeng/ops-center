import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Table, Tooltip, Dropdown, Switch, Menu } from 'antd';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import styles from './BackupCheck.less';

@connect(({ chart, user, loading }) => ({
  chart,
  user,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
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
    const {
      chart,
      user: { currentUser },
      loading,
    } = this.props;
    const { logCountChartList, visitData2, backupRecords } = chart;

    const totalLogCount = logCountChartList.map(c => c.y).reduce((x, y) => x + y, 0);
    const taskProcessingCount = currentUser.taskNotFinishedOfMe;
    const taskFinishedOfMe = currentUser.taskTotalOfMe - currentUser.taskNotFinishedOfMe;
    const menu = (
      <Menu>
        <Menu.Item>只看生产系统</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const platforms = ['ERP 2.0平台', '集成平台', '决策支持平台', '其它平台'];

    const columns = [
      {
        title: '系统名称',
        dataIndex: 'system',
        key: 'system',
        render: text => <a href={`/app/hosts?systemName=${encodeURI(text)}`}>{text}</a>,
      },
      {
        title: '前日',
        dataIndex: 'beforeystd',
        key: 'beforeystd',
        // sorter: (a, b) => a.count - b.count,
        render: text =>
          text === 'OK' ? (
            <span style={{ color: 'cadetblue' }}>{text}</span>
          ) : text === 'Failed' ? (
            <span style={{ color: '#f97676' }}>{text}</span>
          ) : (
            <span style={{ color: '#e8baaa' }}>{text}</span>
          ),
        className: styles.alignRight,
      },
      {
        title: '昨日',
        dataIndex: 'yesterday',
        key: 'yesterday',
        render: text =>
          text === 'OK' ? (
            <span style={{ color: 'cadetblue' }}>{text}</span>
          ) : text === 'Failed' ? (
            <span style={{ color: '#f97676' }}>{text}</span>
          ) : (
            <span style={{ color: '#e8baaa' }}>{text}</span>
          ),
      },
      {
        title: '今日',
        dataIndex: 'today',
        key: 'today',
        render: text =>
          text === 'OK' ? (
            <span style={{ color: 'cadetblue' }}>{text}</span>
          ) : text === 'Failed' ? (
            <span style={{ color: '#f97676' }}>{text}</span>
          ) : (
            <span style={{ color: '#e8baaa' }}>{text}</span>
          ),
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
              footer={<Field label="主机总计" value={`${numeral(2123).format('0,0')}`} />}
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
              title="示例指标"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8436972).format('0,0')}
              footer={<Field label="示例说明" value="60%" />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={logCountChartList} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="24小时日志生成量"
              loading={loading}
              action={
                <Tooltip title="最近24小时">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(totalLogCount).format('0,0')}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比<span className={styles.trendText}>3%</span>
                  </Trend>
                  <Trend flag="down">
                    日环比<span className={styles.trendText}>2%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniBar data={logCountChartList} />
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
                  <div>
                    进行中<b className={styles.trendText} style={{ color: '#40a9ff' }}>
                      {taskProcessingCount}
                    </b>&nbsp;项 &nbsp;&nbsp; 已完成<b
                      className={styles.trendText}
                      style={{ color: '#52c41a' }}
                    >
                      {taskFinishedOfMe}
                    </b>&nbsp;项
                  </div>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>

        <Row gutter={24}>
          {platforms.map(platform => (
            <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ paddingBottom: 20 }}>
              <Card
                // loading={loading}
                bordered={false}
                title={platform}
                extra={iconGroup}
              >
                <Row gutter={68}>
                  <Col sm={12} xs={24} style={{ marginBottom: 22 }}>
                    <NumberInfo
                      subTitle={
                        <span>
                          备份成功数
                          <Tooltip title="昨日备份成功的数据库数">
                            <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                          </Tooltip>
                        </span>
                      }
                      gap={8}
                      total={numeral(103).format('0,0')}
                      // status="up"
                      subTotal={
                        <Icon type="check-circle" style={{ fontSize: 16, color: '#24cc78' }} />
                      }
                    />
                    <MiniArea line height={12} data={visitData2} />
                  </Col>
                  <Col sm={12} xs={24} style={{ marginBottom: 22 }}>
                    <NumberInfo
                      subTitle={
                        <span>
                          备份失败数
                          <Tooltip title="昨日备份失败的数据库数">
                            <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                          </Tooltip>
                        </span>
                      }
                      total={4}
                      // status="down"
                      subTotal={
                        <Icon type="close-circle" style={{ fontSize: 16, color: '#e48390' }} />
                      }
                      gap={8}
                    />
                    <MiniArea line height={12} data={visitData2} />
                  </Col>
                </Row>
                <Table
                  rowKey={record => record.id}
                  size="small"
                  columns={columns}
                  dataSource={backupRecords}
                  pagination={{
                    style: { marginBottom: 0 },
                    pageSize: 5,
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Fragment>
    );
  }
}
