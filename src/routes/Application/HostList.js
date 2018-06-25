import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Modal, message, Form, Input, Select, Icon, Button, Badge, DatePicker } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './HostList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const lifeCycleStatusMapping = [
  { badge: 'processing', status: '沙箱' },
  { badge: 'success', status: '开发' },
  { badge: 'processing', status: '测试' },
  { badge: 'error', status: '生产支持' },
  { badge: 'error', status: '生产' },
  { badge: 'processing', status: '容灾' },
];
const platformNameMapping = ['ERP平台', '用户平台', '集成平台', '决策支持平台', '非结构化平台', '权限平台', '自主开发平台', '其它平台'];
const nodeTypeMapping = [
  'ASCS/SCS',
  'DI',
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
    filters: [
      {
        text: platformNameMapping[0],
        value: 1,
      },
      {
        text: platformNameMapping[1],
        value: 2,
      },
      {
        text: platformNameMapping[2],
        value: 3,
      },
      {
        text: platformNameMapping[3],
        value: 4,
      },
      {
        text: platformNameMapping[4],
        value: 5,
      },
      {
        text: platformNameMapping[5],
        value: 6,
      },
      {
        text: platformNameMapping[6],
        value: 7,
      },
      {
        text: platformNameMapping[7],
        value: 8,
      },
    ],
    render: val => platformNameMapping[`${val - 1}`],
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
        text: lifeCycleStatusMapping[0].status,
        value: 0,
      },
      {
        text: lifeCycleStatusMapping[1].status,
        value: 1,
      },
      {
        text: lifeCycleStatusMapping[2].status,
        value: 2,
      },
      {
        text: lifeCycleStatusMapping[3].status,
        value: 3,
      },
      {
        text: lifeCycleStatusMapping[4].status,
        value: 4,
      },
      {
        text: lifeCycleStatusMapping[5].status,
        value: 5,
      },
    ],
    render(val) {
      return (
        <Badge
          status={lifeCycleStatusMapping[val].badge}
          text={lifeCycleStatusMapping[val].status}
        />
      );
    },
  },
  {
    title: '节点类型',
    dataIndex: 'nodeType',
    render(val) {
      return nodeTypeMapping[`${parseInt(val, 10)}`];
    },
  },
  {
    title: '管理员',
    dataIndex: 'maintainer',
  },
];

const CreateForm = Form.create({
  mapPropsToFields(props) {
    const selectedItem = props.selectedRows;
    const isModify = selectedItem.length === 1 && props.modalTitle === '修改信息';
    return {
      ipAddress: Form.createFormField({
        ...props.ipAddress,
        value: isModify ?  selectedItem[0].ipAddress : null,
      }),
      hostname: Form.createFormField({
        // ...props.hostname,
        value: isModify ?  selectedItem[0].hostname : null,
      }),
      systemName: Form.createFormField({
        // ...props.systemName,
        value: isModify ?  selectedItem[0].systemName : null,
      }),
      lifecycleStatus: Form.createFormField({
        // ...props.lifecycleStatus,
        value: isModify ?  selectedItem[0].lifecycleStatus && selectedItem[0].lifecycleStatus.toString() : null,
      }),
      platformName: Form.createFormField({
        // ...props.platformName,
        value: isModify ?  selectedItem[0].platformName && selectedItem[0].platformName.toString() : null,
        // selected: 2,
      }),
      businessLine: Form.createFormField({
        value: isModify ? selectedItem[0].businessLine && selectedItem[0].businessLine.toString() : null,
      }),
      nodeType: Form.createFormField({
        value: isModify ? selectedItem[0].nodeType && selectedItem[0].nodeType.toString() : null,
      }),
      isVirtualized: Form.createFormField({
        value: isModify ? selectedItem[0].isVirtualized && selectedItem[0].isVirtualized.toString() : null,
      }),
      haType: Form.createFormField({
        value: isModify ? selectedItem[0].haType && selectedItem[0].haType.toString() : null,
      }),
      osRelease: Form.createFormField({
        value: isModify ? selectedItem[0].osRelease && selectedItem[0].osRelease.toString() : null,
      }),
      location: Form.createFormField({
        value: isModify ? selectedItem[0].location && selectedItem[0].location.toString() : null,
      }),
      vlanId: Form.createFormField({
        value: isModify ? selectedItem[0].vlanId : null,
      }),
      company: Form.createFormField({
        value: isModify ? selectedItem[0].company && selectedItem[0].company.toString() : null,
      }),
      maintainer: Form.createFormField({
        value: isModify ? selectedItem[0].maintainer && selectedItem[0].maintainer.toString() : null,
      }),
      currentStatus: Form.createFormField({
        value: isModify ? selectedItem[0].currentStatus && selectedItem[0].currentStatus.toString() : null,
      }),
      applicant: Form.createFormField({
        value: isModify ? selectedItem[0].applicant && selectedItem[0].applicant : null,
      }),
      approver: Form.createFormField({
        value: isModify ? selectedItem[0].approver && selectedItem[0].approver.toString() : null,
      }),
      expiredDate: Form.createFormField({
        value: isModify ? selectedItem[0].expiredDate && selectedItem[0].expiredDate.toString() : null,
      }),
      projectCode: Form.createFormField({
        value: isModify ? selectedItem[0].projectCode && selectedItem[0].projectCode.toString() : null,
      }),
      remarks: Form.createFormField({
        value: isModify ? selectedItem[0].remarks && selectedItem[0].remarks : null,
      }),
    }
  },
})(props => {
  const { modalVisible, modalTitle, selectedRows, form, handleAdd, handleModalVisible } = props;
  if (modalVisible && modalTitle === '修改信息') {
    const selectedItem = selectedRows[0];
    const values = {};
    Object.keys(selectedItem).filter(k => selectedItem[k] !== null).forEach(k => {
      values[k] = selectedItem[k];
    });
    // console.log('values: ', values);
  }
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
              })(<Input placeholder="请输入10或11开头的IP地址" />)}
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
            <FormItem label="系统名称">
              {form.getFieldDecorator('systemName', {
                rules: [{ required: true, message: '请输入系统名称' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="系统类型">
              {form.getFieldDecorator('lifecycleStatus', {
                rules: [{ required: true, message: '请输入系统类型' }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="4">生产</Option>
                  <Option value="3">生产支持</Option>
                  <Option value="2">测试</Option>
                  <Option value="1">开发</Option>
                  <Option value="0">沙箱</Option>
                  <Option value="5">容灾</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="业务域">
              {form.getFieldDecorator('businessLine')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">统建</Option>
                  <Option value="1">上市</Option>
                  <Option value="2">未上市</Option>
                  <Option value="3">总部</Option>
                  <Option value="4">油气田</Option>
                  <Option value="5">销售</Option>
                  <Option value="6">炼化</Option>
                  <Option value="7">人力资源</Option>
                  <Option value="8">天然气与管道</Option>
                  <Option value="9">工程建设</Option>
                  <Option value="10">工程技术</Option>
                  <Option value="11">装备制造</Option>
                  <Option value="12">海外</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="平台名称">
              {form.getFieldDecorator('platformName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">ERP平台</Option>
                  <Option value="2">用户平台</Option>
                  <Option value="3">集成平台</Option>
                  <Option value="4">决策支持平台</Option>
                  <Option value="5">非结构化平台</Option>
                  <Option value="6">权限平台</Option>
                  <Option value="7">自主开发平台</Option>
                  <Option value="8">其它平台</Option>
                </Select>
              )}
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
                  <Option value="1">vSphere FT</Option>
                  <Option value="2">vSphere HA</Option>
                  <Option value="3">Oraccle RAC</Option>
                  <Option value="4">Oracle DataGuard/GoldenGate</Option>
                  <Option value="5">SQL Server AlwaysOn Failover Cluster</Option>
                  <Option value="6">HANA/一体机HA方案</Option>
                  <Option value="7">其它HA方案</Option>
                  <Option value="0">无</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="操作系统">
              {form.getFieldDecorator('osRelease')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">Redhat Enterprise Linux</Option>
                  <Option value="2">Suse Enterprise Linux</Option>
                  <Option value="3">Windows Server</Option>
                  <Option value="4">Windows 7/8/10/XP/2003</Option>
                  <Option value="5">CentOS Linux</Option>
                  <Option value="6">Ubuntu Linux</Option>
                  <Option value="7">其它操作系统</Option>
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
          <Col md={8} sm={24}>
            <FormItem label="VLAN ID">
              {form.getFieldDecorator('vlanId')(<Input placeholder="请输入" />)}
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
            <FormItem label="应用管理员">
              {form.getFieldDecorator('maintainer')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="曹超">曹超</Option>
                  <Option value="董国荣">董国荣</Option>
                  <Option value="韩心怡">韩心怡</Option>
                  <Option value="胡帅">胡帅</Option>
                  <Option value="姜永锐">姜永锐</Option>
                  <Option value="赛旭骞">赛旭骞</Option>
                  <Option value="孙永辉">孙永辉</Option>
                  <Option value="王禹博">王禹博</Option>
                  <Option value="文都子">文都子</Option>
                  <Option value="薛海鹏">薛海鹏</Option>
                  <Option value="许冠雄">许冠雄</Option>
                  <Option value="杨科">杨科</Option>
                  <Option value="赵鑫">赵鑫</Option>
                  <Option value="周惟">周惟</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="当前状态">
              {form.getFieldDecorator('currentStatus')(
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
                  <Option value="5">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="到期时间（临时系统填写）">
              {form.getFieldDecorator('expiredDate')(<DatePicker />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={16} sm={48}>
            <FormItem label="项目名称">
              {form.getFieldDecorator('projectCode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="D6">D6-总部ERP系统（含应用集成公用系统）</Option>
                  <Option value="D7">D7-总部ERP系统（含应用集成公用系统）</Option>
                  <Option value="D8">D8-总部ERP系统（含应用集成公用系统）</Option>
                  <Option value="D12">D12-人力资源ERP系统</Option>
                  <Option value="D13">D13-油气田应用集成系统（含D2-勘探与生产ERP系统、D10-油田服务ERP系统）</Option>
                  <Option value="D14">D14-天然气与管道应用集成系统（D3-天然气与管道ERP系统）</Option>
                  <Option value="D15">D15-炼油与化工应用集成系统（D4-炼油与化工ERP系统）</Option>
                  <Option value="D16">D16-销售应用集成系统（含D5-销售ERP系统）</Option>
                  <Option value="D17">D17-工程技术应用集成系统（含D7-工程技术ERP系统）</Option>
                  <Option value="D18">D18-装备制造应用集成系统（含D8-装备制造ERP系统）</Option>
                  <Option value="D19">D19-海外勘探开发应用集成系统（含D9-海外勘探开发ERP系统）</Option>
                  <Option value="D20">D20-工程建设应用集成系统（含D11-工程建设ERP系统）</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="备注">
              {form.getFieldDecorator('remarks')(<Input placeholder="请输入" />)}
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
        expiredDate:
          fieldsValue.expiredDate && fieldsValue.expiredDate.valueOf(),
          // `${fieldsValue.expiredDate.valueOf()} - ${fieldsValue.dateTime[1].valueOf()}`,
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
      type: 'app/add',
      payload: {
        ...fields,
      },
    });
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
    this.props.dispatch({
      type: 'app/fetch',
      payload: this.state.formValues,
    });
  };

  handleView = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleEdit = () => {
    this.handleModalVisible(true, '修改信息');
  };

  handleDelete = () => {
    this.props.dispatch({
      type: 'app/remove',
      payload: {
        id: this.state.selectedRows.map(row => row.id).join(','),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
    message.success('删除成功');
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
                  <Option value="4">生产</Option>
                  <Option value="3">生产支持</Option>
                  <Option value="2">测试</Option>
                  <Option value="1">开发</Option>
                  <Option value="0">沙箱</Option>
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
      handleEdit: this.handleEdit,
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
                      <Button onClick={() => parentMethods.handleEdit()}>
                        <Icon type="edit" />编辑
                      </Button>
                    </span>
                  )}
                  <Button onClick={() => this.handleDelete()}>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} modalTitle={modalTitle} selectedRows={selectedRows} />
      </PageHeaderLayout>
    );
  }
}
