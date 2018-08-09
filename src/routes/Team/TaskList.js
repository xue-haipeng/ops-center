import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Modal,
  Form,
  Avatar,
  Button,
  Table,
  Rate,
  Progress,
  DatePicker,
  Input,
  Select,
  Radio,
  Badge,
  message,
  Slider,
  Popconfirm,
} from 'antd';
import { Radar, TagCloud } from 'components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import { CATEGORY, MEMBERS, STATUS } from './constants';
import styles from './TaskList.less';

const FormItem = Form.Item;
// eslint-disable-next-line prefer-destructuring
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const tags = [];
for (let i = 0; i < 50; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
    value: Math.floor((Math.random() * 50)) + 20,
  });
}

const columns = [
  // { title: '编号', dataIndex: 'sn', key: 'sn' },
  { title: '标题', dataIndex: 'title', key: 'title' },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    render: val => (
      <Badge count={CATEGORY[val]} style={{ backgroundColor: '#80bba0' }} />
    ),
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
    render: val => (
      <Rate
        character={val === 0 ? '低' : val === 1 ? '中' : '高'}
        allowHalf
        count={1}
        value={1}
        disabled
        style={val === 0 ? { color: '#aaa8a4', fontSize: '14px' } : val === 1 ? { color: '##fadb14', fontSize: '14px' } : { color: '#aa4d30', fontSize: '14px' }}
      />),
  },
  {
    title: '重要程度',
    dataIndex: 'significance',
    key: 'significance',
    render: val => (
      <Rate
        character={val === 0 ? '!' : val === 1 ? '!!' : '!!!'}
        allowHalf
        count={1}
        value={1}
        disabled
        style={val === 0 ? { color: '#aaa8a4', fontSize: '16px' } : val === 1 ? { color: '##fadb14', fontSize: '16px' } : { color: '#aa4d30', fontSize: '16px' }}
      />),
  },
  {
    title: '负责人',
    dataIndex: 'participant',
    key: 'participant',
    render: val => val !== null ? val.split(",")[0] : '',
  },
  { title: '预计完成日期', dataIndex: 'scheduledDate', key: 'scheduledDate' },
  // { title: '实际完成日期', dataIndex: 'actualDate', key: 'actualDate' },
  {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    width: 160,
    render: val => (val === 100 ? <Progress percent={val} size="small" /> : <Progress percent={val} size="small" status="active" />),
  },
];

const CreateForm = Form.create({
  mapPropsToFields(props) {
    const selectedItem = props.selectedRow;
// eslint-disable-next-line prefer-destructuring
    const currentUser = props.currentUser;
    const isModify = selectedItem && props.modalTitle === '修改任务';
    return {
      id: Form.createFormField({
        value: isModify ? selectedItem.id : null,
      }),
      user: Form.createFormField({
        value: currentUser.realName,
      }),
      title: Form.createFormField({
        value: isModify ? selectedItem.title : null,
      }),
      category: Form.createFormField({
        value: isModify ? selectedItem.category : null,
      }),
      priority: Form.createFormField({
        value: isModify ? selectedItem.priority : null,
      }),
      significance: Form.createFormField({
        value: isModify
          ? selectedItem.significance && selectedItem.significance
          : null,
      }),
      participants: Form.createFormField({
        value: isModify
          ? selectedItem.participant && selectedItem.participant.split(",")
          : [currentUser.realName],
      }),
      startDate: Form.createFormField({
        value: isModify
          ? selectedItem.startDate && moment(selectedItem.startDate.toString())
          : moment(),
      }),
      scheduledDate: Form.createFormField({
        value: isModify
          ? selectedItem.scheduledDate && moment(selectedItem.scheduledDate.toString())
          : moment(),
      }),
      actualDate: Form.createFormField({
        value: isModify
          ? selectedItem.actualDate && moment(selectedItem.actualDate.toString())
          : moment(),
      }),
      progress: Form.createFormField({
        value: isModify
          ? selectedItem.progress && selectedItem.progress
          : null,
      }),
      status: Form.createFormField({
        value: isModify
          ? selectedItem.status && selectedItem.status
          : null,
      }),
      description: Form.createFormField({
        value: isModify
          ? selectedItem.description && selectedItem.description.toString()
          : null,
      }),
      remarks: Form.createFormField({
        value: isModify ? selectedItem.remarks && selectedItem.remarks : null,
      }),
    };
  },
})(props => {
  const {
    modalVisible,
    modalTitle,
    selectedRow,
    form,
    handleAdd,
    handleUpdate,
    handleCancel,
  } = props;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const children = [];
  MEMBERS.forEach((val) => {
    children.push(<Option key={val}>{val}</Option>)
  });

  if (modalVisible && modalTitle === '修改任务') {
    const values = {};
    Object.keys(selectedRow)
      .filter(k => selectedRow[k] !== null)
      .forEach(k => {
        values[k] = selectedRow[k];
      });
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const values = {
        ...fieldsValue,
        startDate: fieldsValue.startDate && fieldsValue.startDate.format('YYYY-MM-DD'),
        scheduledDate: fieldsValue.scheduledDate && fieldsValue.scheduledDate.format('YYYY-MM-DD'),
        actualDate: fieldsValue.actualDate && fieldsValue.actualDate.format('YYYY-MM-DD'),
      };
      if (modalTitle === '修改任务') {
        handleUpdate(values);
      } else {
        handleAdd(values);
      }
    });
  };
  const handleChange = val => {
    console.log('selected val: ', val);
  };

  return (
    <Modal
      // width="800px"
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={handleCancel}
    >
      <Form>
        <FormItem {...formItemLayout}>
          {form.getFieldDecorator('id', {
          })(<Input type="hidden" />)}
        </FormItem>
        <FormItem {...formItemLayout}>
          {form.getFieldDecorator('user', {
          })(<Input type="hidden" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标题"
        >
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入任务标题' }],
          })(<Input placeholder="任务标题" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类"
        >
          {form.getFieldDecorator('category', {
            rules: [{ required: true, message: '请输入任务分类' }],
          })(
            <Select
              // style={{ width: 180 }}
              placeholder="请选择"
              onChange={handleChange}
            >
              <Option value="M">日常运维</Option>
              <Option value="I">实施（安装/升级/迁移/Patch）</Option>
              <Option value="T">排错</Option>
              <Option value="L">培训/宣讲</Option>
              <Option value="D">文档/设计/开发</Option>
              <Option value="P">PaaS相关</Option>
              <Option value="B">大数据相关</Option>
              <Option value="S">技术支持、现场/驻场支持</Option>
              <Option value="O">其它工作</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="优先级"
        >
          {form.getFieldDecorator('priority', {
            rules: [{ required: true, message: '请选择优先级' }],
          })(
            <RadioGroup name="priority" initialValue={1}>
              <Radio value={0}>低</Radio>
              <Radio value={1}>中</Radio>
              <Radio value={2}>高</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重要程度"
        >
          {form.getFieldDecorator('significance', {
            rules: [{ required: true, message: '请选择任务重要程度' }],
          })(
            <RadioGroup name="priority" initialValue={1}>
              <Radio value={0}>较低</Radio>
              <Radio value={1}>一般</Radio>
              <Radio value={2}>重要</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开始日期"
        >
          {form.getFieldDecorator('startDate', {
            rules: [{ type: 'object', required: true, message: '请选择任务开始日期' }],
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="预计完成日期"
        >
          {form.getFieldDecorator('scheduledDate', {
            rules: [{ type: 'object', required: true, message: '请选择预计完成日期' }],
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="负责人/参与人"
        >
          {form.getFieldDecorator('participants', {
            rules: [{ required: true, message: '请选择参与人' }],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择"
              onChange={handleChange}
            >
              {children}
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="当前状态"
        >
          {form.getFieldDecorator('status', {
            rules: [{ required: true, message: '请选择任务当前状态' }],
          })(
            <RadioGroup name="priority" initialValue={1}>
              <Radio value={0}>未开始</Radio>
              <Radio value={1}>进行中</Radio>
              <Radio value={2}>暂停中</Radio>
              <Radio value={3}>阻塞中</Radio>
              <Radio value={4}>已完成</Radio>
              <Radio value={5}>已取消/终止</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="当前进度(%)"
        >
          {form.getFieldDecorator('progress')(
            <Slider marks={{ 0: '0%', 20: '20%', 40: '40%', 60: '60%', 80: '80%', 100: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务描述"
        >
          {form.getFieldDecorator('description')(<TextArea rows={3} />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

@connect(({ project, team, user, loading }) => ({
  project,
  team,
  user,
  loading,
/*  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'], */
}))
export default class TaskList extends PureComponent {
  state = {
    visible: false,
    title: '',
    selectedRow: {},
    pagination: {},
    percent: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'team/fetch',
    });
    dispatch({
      type: 'user/fetchCurrent',
    });
/*    dispatch({
      type: 'team/countNotFinished',
      payload: user.currentUser.realName,
    }) */
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  onOpen = (title, record) => {
    const selectedRow = record || this.state.selectedRow;
    this.setState({
      visible: true,
      title,
      selectedRow,
    })
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'team/add',
      payload: {
        ...fields,
      },
    });
    message.success('添加成功', 4);
    this.setState({
      visible: false,
    });
    setTimeout(
      () =>
        this.props.dispatch({
          type: 'team/fetch',
          payload: {
            page: this.state.pagination.current,
            size: this.state.pagination.pageSize,
          },
        }),
      800
    );
  };
  handleUpdate = fields => {
    this.props.dispatch({
      type: 'team/update',
      payload: {
        ...fields,
      },
    });
    message.success('更新成功', 4);
    this.setState({
      visible: false,
    });
    setTimeout(
      () =>
        this.props.dispatch({
          type: 'team/fetch',
          payload: {
            page: this.state.pagination.current,
            size: this.state.pagination.pageSize,
          },
        }),
      1000
    );
  };

  handleDelete = (id) => {
    this.props.dispatch({
      type: 'team/remove',
      payload: {
        id,
      },
    });
    message.success('删除成功');
    setTimeout(
      () =>
        this.props.dispatch({
          type: 'team/fetch',
          payload: {
            page: this.state.pagination.current,
            size: this.state.pagination.pageSize,
          },
        }),
      1000
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;

    this.setState({
      pagination,
    });

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'team/fetch',
      payload: params,
    });
  };

  render() {
    const {
      project: { notice },
      team: { data },
      user: { currentUser },
    } = this.props;

    const allTasksCount = data && data.pagination.total;
    const { taskNotFinished: taskNotFinishedOfMe, taskTotalOfMe } = currentUser;
    const greeting = new Date().getHours() < 12 ? '早上好，' : '下午好，';
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src={currentUser.avatar}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{greeting}{currentUser.realName}，祝你开心每一天！</div>
          <div>记录和分享每一次辛勤的劳动付出，让工作更加清晰调理！</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>我参与的任务</p>
          <p>
            {taskNotFinishedOfMe}
            <span> / {taskTotalOfMe}</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>所有任务</p>
          <p>
            {allTasksCount}
            {/* <span> {allTasksCount}</span> */}
          </p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        {/* <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
            />
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="工作量分布"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              title="标签云"
              bordered={false}
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
            >
              <TagCloud data={tags} height={161} />
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="月度MVP"
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {members.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.link}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.title}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row> */}
        <Row gutter={24} style={{ marginTop: 24, marginLeft: 3, marginRight: 3 }}>
          <Card style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Button type="dashed" onClick={() => this.onOpen('新建任务')} style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加任务
            </Button>
            <Table
              columns={columns}
              expandedRowRender={record => (
                <Row gutter={24}>
                  <Col span={20}>
                    <Row gutter={24} style={{ marginBottom: '10px' }}>
                      <Col span={7}>
                        <p style={{ margin: 0 }}>开始日期：{record.startDate}</p>
                      </Col>
                      <Col span={7} style={{ paddingLeft: 0 }}>
                        {/* <p style={{ margin: 0 }}>{ record.status === 4 ? `完成日期：${record.actualDate}` : `当前状态：${STATUS[record.status].name}` }</p> */}
                        {
                          record.status === 4
                            ? <p style={{ margin: 0 }}>完成日期：{record.actualDate}</p>
                            : <p style={{ margin: 0 }}>当前状态：<Badge status={STATUS[record.status].status} text={STATUS[record.status].name} /></p>
                        }
                      </Col>
                      <Col span={10}>
                        <p style={{ margin: 0 }}>创建时间：{`${record.createdTime}`.replace("T", " ")}</p>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={7}>
                        <p style={{ margin: 0 }}>参与人：{record.participant}</p>
                      </Col>
                      <Col gutter={17}>
                        <p style={{ margin: 0 }}>任务描述：{record.description}</p>
                      </Col>
                    </Row>
                  </Col>
                  { record.participant.split(',').indexOf(currentUser.realName) > -1 &&
                    (
                      <Col span={4}>
                        <Button size="small" style={{ marginRight: 10 }} onClick={() => this.onOpen('修改任务', record)}>修改</Button>
                        <Popconfirm
                          title="确定要删除这项任务？"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.handleDelete(record.id)}
                        >
                          <Button type="danger" size="small">删除</Button>
                        </Popconfirm>
                      </Col>
                    )
                  }
                </Row>
              )}
              dataSource={data.list}
              pagination={data.pagination}
              rowKey="id"
              onChange={this.handleStandardTableChange}
            />
          </Card>
        </Row>

        <CreateForm
          modalVisible={this.state.visible}
          modalTitle={this.state.title}
          selectedRow={this.state.selectedRow}
          handleAdd={this.handleAdd}
          handleUpdate={this.handleUpdate}
          handleCancel={this.handleCancel}
          percent={this.state.percent}
          currentUser={currentUser}
        />
      </PageHeaderLayout>
    );
  }
}
