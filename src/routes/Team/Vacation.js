import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Row,
  Card,
  Button,
  Calendar,
  Badge, Form, Input, Select, Modal, DatePicker,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Vacation.less';
import { MEMBERS, VACATION_TYPE } from './constants';

const FormItem = Form.Item;
// eslint-disable-next-line prefer-destructuring
const Option = Select.Option;
const { RangePicker } = DatePicker;

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
      description: Form.createFormField({
        value: isModify
          ? selectedItem.description && selectedItem.description.toString()
          : null,
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
      const startDate = fieldsValue.range[0].format('YYYY-MM-DD HH:mm:ss');
      const endDate = fieldsValue.range[1].format('YYYY-MM-DD HH:mm:ss');
      const range = [startDate, endDate];
      const values = {
        ...fieldsValue,
        range,
      };
      handleAdd(values);
      form.resetFields();
    });
  };

  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: '请选择日期' }],
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
        <FormItem
          {...formItemLayout}
          label="请假人"
        >
          {form.getFieldDecorator('staffs', {
            rules: [{ required: true, message: '请选择请假人' }],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择"
              // onChange={handleChange}
            >
              {children}
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请假类型"
        >
          {form.getFieldDecorator('type', {
            rules: [{ required: true, message: '请输入假期类型' }],
          })(
            <Select
              placeholder="请选择"
              // onChange={handleChange}
            >
              <Option value="事假">事假</Option>
              <Option value="病假">病假</Option>
              <Option value="年假">年假</Option>
              <Option value="婚嫁">婚嫁</Option>
              <Option value="调休">调休</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请假日期"
        >
          {form.getFieldDecorator('range', rangeConfig)(
            <RangePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请假事由"
        >
          {form.getFieldDecorator('reason')(<Input placeholder="请输入" />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

@connect(({ team, user, global, loading }) => ({
  team,
  user,
  global,
  loading: loading.models.team,
}))
export default class TaskList extends PureComponent {
  state = {
    visible: false,
    selectedRow: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'team/fetchVacations',
    });
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  onOpen = (title, record) => {
    const selectedRow = record || this.state.selectedRow;
    this.setState({
      visible: true,
      selectedRow,
    });
  };

  onSelect = (value) => {
    console.log(value.valueOf());
  };

  getListData = (value) => {
    const dataList = this.props.team.vacations || [];
    const listData = dataList.filter(item => item.dt === value.format('YYYY-MM-DD'));
    return listData || [];
  };

  getMonthData = (value) => {
    const dataList = this.props.team.vacations || [];

    const listData = dataList.filter(item => item.dt.substring(0, item.dt.lastIndexOf("-")) === value.format('YYYY-MM'));
    return listData.map(item => 1).reduce((prev, curr) => prev + curr, 0);
  };

  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <span>本月总计</span>
        <section><span style={{ color: 'red', fontSize: 'larger' }}>{num}</span>&nbsp;人/天</section>
      </div>
    ) : null;
  };

  dateCellRender = (value) => {
    const listData = this.getListData(value);
    return (
      <ul className="events" style={{ listStyle: 'none' }}>
        {
          listData.map(item => (
            <li key={item.id}>
              <Badge count={item.type.substring(0, 1)} style={{ backgroundColor: VACATION_TYPE.filter(v => v.name === item.type)[0].color}} />&nbsp;
              <span style={{ verticalAlign: 'middle' }}>{item.staff}</span>
            </li>
          ))
        }
      </ul>
    );
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'team/addVacation',
      payload: {
        ...fields,
      },
    });
    this.setState({
      visible: false,
    });
    setTimeout(
      () => {
        this.props.dispatch({
          type: 'team/fetchVacations',
        })
      },
      1000
    );
  };
  handleUpdate = fields => {

  };

  handleDelete = (id) => {

  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      user: { currentUser },
      loading,
    } = this.props;

    const children = [];
    MEMBERS.forEach((val) => {
      children.push(<Option key={val}>{val}</Option>)
    });

    return (
      <PageHeaderLayout content={this.pageHeaderContent} extraContent={this.extraContent}>
        <Row gutter={24} style={{ marginTop: 24, marginLeft: 3, marginRight: 3 }}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="请假管理"
            style={{ paddingLeft: 0, paddingRight: 0 }}
            // bodyStyle={{ padding: '0 32px 40px 32px' }}
            // extra={listHeader}
          >
            <Button type="dashed" onClick={() => this.onOpen('新增请假')} style={{ width: '100%', marginBottom: 8 }} icon="plus">
              新增请假
            </Button>
            <Calendar
              dateCellRender={this.dateCellRender}
              monthCellRender={this.monthCellRender}
              onSelect={this.onSelect}
              // validRange={[moment().subtract(6, 'month').calendar(), moment().add(6, 'month').calendar()]}
            />
          </Card>
        </Row>

        <CreateForm
          modalVisible={this.state.visible}
          modalTitle="新增请假信息"
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
