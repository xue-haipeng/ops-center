import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Modal, Form, Input, Select, Icon, Button, Badge } from 'antd';
import { message } from 'antd/lib/index';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './HostList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const lifeCycleStatusMapping = {
  '0': { badge: 'processing', status: '沙箱' },
  '1': { badge: 'success', status: '开发' },
  '2': { badge: 'processing', status: '测试' },
  '3': { badge: 'error', status: '生产支持' },
  '4': { badge: 'error', status: '生产' },
  '5': { badge: 'processing', status: '容灾' },
};
const nodeTypeMapping = [
  'ASCS/SCS',
  'DI',
  'AServer/DMGR',
  'AServer/DMGR',
  'MServer/AppServer',
  '数据库',
  'HANA/一体机',
  'Web服务器',
  'UEP管理节点',
  'UEP主应用',
];
const columns = [
  {
    title: '主机名',
    dataIndex: 'hostname',
  },
  {
    title: '平台',
    dataIndex: 'platformName',
  },
  {
    title: 'IP地址',
    dataIndex: 'ipAddress',
  },
  {
    title: '系统名称',
    dataIndex: 'systemName',
  },
  {
    title: '系统类型',
    dataIndex: 'lifecycleStatus',
    filters: [
      {
        text: lifeCycleStatusMapping['0'].status,
        value: 0,
      },
      {
        text: lifeCycleStatusMapping['1'].status,
        value: 1,
      },
      {
        text: lifeCycleStatusMapping['2'].status,
        value: 2,
      },
      {
        text: lifeCycleStatusMapping['3'].status,
        value: 3,
      },
      {
        text: lifeCycleStatusMapping['4'].status,
        value: 4,
      },
      {
        text: lifeCycleStatusMapping['5'].status,
        value: 5,
      },
    ],
    render(val) {
      return (
        <Badge
          status={lifeCycleStatusMapping[val.toString()].badge}
          text={lifeCycleStatusMapping[val.toString()].status}
        />
      );
    },
  },
  {
    title: '节点类型',
    dataIndex: 'nodeType',
    render(val) {
      const index = parseInt(val, 10) + 1;
      return nodeTypeMapping[index];
    },
  },
  {
    title: '管理员',
    dataIndex: 'maintainer',
  },
];

const CreateForm = Form.create()(props => {
  const { modalVisible, modalTitle, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      width="800px"
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="IP地址">
              {form.getFieldDecorator('ipAddress', {
                rules: [{ required: true, message: '请输入有效的IP地址' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="主机名称">
              {form.getFieldDecorator('hostname', {
                rules: [{ required: true, message: '请输入主机名称' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="系统类型">
              {form.getFieldDecorator('lifecycleStatus', {
                rules: [{ required: true, message: '请输入系统类型' }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">生产</Option>
                  <Option value="1">生产支持</Option>
                  <Option value="2">测试</Option>
                  <Option value="3">开发</Option>
                  <Option value="4">沙箱</Option>
                  <Option value="5">容灾</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="项目名称">
              {form.getFieldDecorator('projectName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">ASCS/SCS</Option>
                  <Option value="2">DI</Option>
                  <Option value="3">AServer/DMGR</Option>
                  <Option value="4">MServer/AppServer</Option>
                  <Option value="5">Database</Option>
                  <Option value="6">HANA/Appliance</Option>
                  <Option value="7">Web服务器</Option>
                  <Option value="8">UEP管理节点</Option>
                  <Option value="9">UEP主应用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="平台名称">
              {form.getFieldDecorator('platformName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">ASCS/SCS</Option>
                  <Option value="2">DI</Option>
                  <Option value="3">AServer/DMGR</Option>
                  <Option value="4">MServer/AppServer</Option>
                  <Option value="5">Database</Option>
                  <Option value="6">HANA/Appliance</Option>
                  <Option value="7">Web服务器</Option>
                  <Option value="8">UEP管理节点</Option>
                  <Option value="9">UEP主应用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="业务域">
              {form.getFieldDecorator('businessLine')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">ASCS/SCS</Option>
                  <Option value="2">DI</Option>
                  <Option value="3">AServer/DMGR</Option>
                  <Option value="4">MServer/AppServer</Option>
                  <Option value="5">Database</Option>
                  <Option value="6">HANA/Appliance</Option>
                  <Option value="7">Web服务器</Option>
                  <Option value="8">UEP管理节点</Option>
                  <Option value="9">UEP主应用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="应用管理员">
              {form.getFieldDecorator('maintainer')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="4">曹超</Option>
                  <Option value="8">董国荣</Option>
                  <Option value="1">韩心怡</Option>
                  <Option value="2">胡帅</Option>
                  <Option value="3">姜永锐</Option>
                  <Option value="8">赛旭骞</Option>
                  <Option value="5">孙永辉</Option>
                  <Option value="6">王禹博</Option>
                  <Option value="9">文都子</Option>
                  <Option value="8">薛海鹏</Option>
                  <Option value="8">许冠雄</Option>
                  <Option value="9">杨科</Option>
                  <Option value="8">赵鑫</Option>
                  <Option value="7">周惟</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="系统名称">
              {form.getFieldDecorator('systemName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="节点类型">
              {form.getFieldDecorator('nodeType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">ASCS/SCS</Option>
                  <Option value="2">DI</Option>
                  <Option value="3">AServer/DMGR</Option>
                  <Option value="4">MServer/AppServer</Option>
                  <Option value="5">Database</Option>
                  <Option value="6">HANA/Appliance</Option>
                  <Option value="7">Web服务器</Option>
                  <Option value="8">UEP管理节点</Option>
                  <Option value="9">UEP主应用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="是否虚拟机">
              {form.getFieldDecorator('isVirtualized')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">虚拟机</Option>
                  <Option value="0">物理机</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="高可用类型">
              {form.getFieldDecorator('haType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">ASCS/SCS</Option>
                  <Option value="2">DI</Option>
                  <Option value="3">AServer/DMGR</Option>
                  <Option value="4">MServer/AppServer</Option>
                  <Option value="5">Database</Option>
                  <Option value="6">HANA/Appliance</Option>
                  <Option value="7">Web服务器</Option>
                  <Option value="8">UEP管理节点</Option>
                  <Option value="9">UEP主应用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="机房位置">
              {form.getFieldDecorator('location')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="M01">昌平M01机房</Option>
                  <Option value="M03">昌平M03机房</Option>
                  <Option value="M08">吉林M08机房</Option>
                  <Option value="M10">吉林M10机房</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="维护单位">
              {form.getFieldDecorator('company')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">中油瑞飞</Option>
                  <Option value="2">规划总院</Option>
                  <Option value="3">大庆金桥</Option>
                  <Option value="4">其它单位</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="VLAN ID">
              {form.getFieldDecorator('vlanId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="备注">
              {form.getFieldDecorator('remark')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="申请人/业务联系人">
              {form.getFieldDecorator('applicant')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="审批人">
              {form.getFieldDecorator('approver')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">付长春</Option>
                  <Option value="2">杜广源</Option>
                  <Option value="3">娄宏俊</Option>
                  <Option value="4">王茜</Option>
                  <Option value="4">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="当前状态">
              {form.getFieldDecorator('company')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">正常使用</Option>
                  <Option value="2">已过期</Option>
                  <Option value="3">已停机</Option>
                  <Option value="4">已回收</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

@connect(({ app, loading }) => ({
  app,
  loading: loading.models.app,
}))
@Form.create()
export default class HostList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/fetch',
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
      type: 'app/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'app/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'app/remove',
          payload: {
            id: selectedRows.map(row => row.id).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        dateTime:
          fieldsValue.dateTime &&
          `${fieldsValue.dateTime[0].valueOf()} - ${fieldsValue.dateTime[1].valueOf()}`,
      };
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'app/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, title) => {
    this.setState({
      modalVisible: !!flag,
      modalTitle: title,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleView = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleEdit = row => {
    this.props.dispatch({
      type: 'hosts/modify',
      payload: {
        host: row[0],
      },
    });

    message.success('修改成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleDelete = row => {
    console.log(row);
    this.setState({
      modalVisible: false,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="IP地址">
              {getFieldDecorator('ipAddress')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="主机名">
              {getFieldDecorator('hostname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
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
            <FormItem label="IP地址">
              {getFieldDecorator('ipAddress')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="主机名称">
              {getFieldDecorator('hostname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="系统类型">
              {getFieldDecorator('lifecycleStatus')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">生产</Option>
                  <Option value="1">生产支持</Option>
                  <Option value="2">测试</Option>
                  <Option value="3">开发</Option>
                  <Option value="4">沙箱</Option>
                  <Option value="5">容灾</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="管理员">
              {getFieldDecorator('maintainer')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="系统名称">
              {getFieldDecorator('systemName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="节点类型">
              {getFieldDecorator('nodeType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">ASCS/SCS</Option>
                  <Option value="2">DI</Option>
                  <Option value="3">AServer/DMGR</Option>
                  <Option value="4">MServer/AppServer</Option>
                  <Option value="5">Database</Option>
                  <Option value="6">HANA/Appliance</Option>
                  <Option value="7">Web服务器</Option>
                  <Option value="8">UEP管理节点</Option>
                  <Option value="9">UEP主应用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
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
    const {
      app: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleView: this.handleView,
      handleDelete: this.handleDelete,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleModalVisible(true, '添加主机')}
              >
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  {selectedRows.length === 1 && (
                    <span>
                      <Button onClick={() => this.handleModalVisible(true, '查看详情')}>
                        <Icon type="info-circle-o" />查看
                      </Button>
                      <Button onClick={() => this.handleModalVisible(true, '修改信息')}>
                        <Icon type="edit" />编辑
                      </Button>
                    </span>
                  )}
                  <Button onClick={() => this.handleDelete(selectedRows)}>
                    <Icon type="delete" />删除
                  </Button>
                </span>
              )}
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} modalTitle={modalTitle} />
      </PageHeaderLayout>
    );
  }
}
