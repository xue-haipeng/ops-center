import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Badge } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './OrderList.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMapping = {
  '0': { badge: 'processing', status: '待付款' },
  '1': { badge: 'success', status: '已完成' },
  '3': { badge: 'processing', status: '订单确认中' },
  '-1': { badge: 'error', status: '支付失败' },
  '2': { badge: 'error', status: '已取消' },
  '16': { badge: 'processing', status: '退款中' },
  '64': { badge: 'default', status: '退款完成' },
};
const columns = [
  {
    title: '订单号',
    dataIndex: 'fuwuOrderId',
  },
  {
    title: '买家名称',
    dataIndex: 'isvPin',
  },
  {
    title: '卖家名称',
    dataIndex: 'ispPin',
  },
  {
    title: '数据名称',
    dataIndex: 'goodsList',
    render: val => val[0].name,
  },
  {
    title: '订单状态',
    dataIndex: 'state',
    filters: [
      {
        text: statusMapping["0"].status,
        value: 0,
      },
      {
        text: statusMapping["1"].status,
        value: 1,
      },
      {
        text: statusMapping["3"].status,
        value: 3,
      },
      {
        text: statusMapping["-1"].status,
        value: -1,
      },
      {
        text: statusMapping["2"].status,
        value: 2,
      },
      {
        text: statusMapping["16"].status,
        value: 16,
      },
      {
        text: statusMapping["64"].status,
        value: 64,
      },
    ],
    render(val) {
      return <Badge status={statusMapping[val.toString()].badge} text={statusMapping[val.toString()].status} />;
    },
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
    sorter: true,
    needTotal: true,
    render: val => `${val}元`,
  },
  {
    title: '下单时间',
    dataIndex: 'dateTime',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
];

@connect(({ wxorder, loading }) => ({
  wxorder,
  loading: loading.models.wxorder,
}))
@Form.create()
export default class OrderList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'wxorder/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'wxorder/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState(prevState => ({
      formValues: {},
    }));
    dispatch({
      type: 'wxorder/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState(prevState => ({
      expandForm: !this.state.expandForm,
    }));
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'wxorder/remove',
          payload: {
            id: selectedRows.map(row => row.id).join(','),
          },
          callback: () => {
            this.setState(prevState => ({
              selectedRows: [],
            }));
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState(prevState => ({
      selectedRows: rows,
    }));
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        dateTime: fieldsValue.dateTime && `${fieldsValue.dateTime[0].valueOf()} - ${fieldsValue.dateTime[1].valueOf()}`,
      };
      this.setState(prevState => ({
        formValues: values,
      }));

      dispatch({
        type: 'wxorder/fetch',
        payload: values,
      });
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('fuwuOrderId')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单状态">
              {getFieldDecorator('state')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">待付款</Option>
                  <Option value="1">已完成</Option>
                  <Option value="3">订单确认中</Option>
                  <Option value="-1">支付失败</Option>
                  <Option value="2">已取消</Option>
                  <Option value="16">退款中</Option>
                  <Option value="64">退款完成</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('fuwuOrderId')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单状态">
              {getFieldDecorator('state')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">待付款</Option>
                  <Option value="1">已完成</Option>
                  <Option value="3">订单确认中</Option>
                  <Option value="-1">支付失败</Option>
                  <Option value="2">已取消</Option>
                  <Option value="16">退款中</Option>
                  <Option value="64">退款完成</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="买家名称">
              {getFieldDecorator('isvPin')(
                <Input placeholer="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={16} sm={48}>
            <FormItem label="下单日期">
              {getFieldDecorator('dateTime')(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['起始时间', '结束时间']}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { wxorder: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
