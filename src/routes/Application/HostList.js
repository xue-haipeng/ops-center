import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Modal,
  message,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Badge,
  DatePicker,
  List,
} from 'antd';
import moment from 'moment';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './HostList.less';
import { getCurrentUser } from '../../utils/authority';
import {
  LIFECYCLE_STATUS,
  PLATFORM_NAME,
  NODE_TYPE,
  BUSINESS_LINE,
  HA_TYPE,
  OS_RELEASE,
  LOCATION,
  COMPANY,
  CURRENT_STATUS,
  APPROVER,
  PROJECT_CODE,
} from './constant';

const { Description } = DescriptionList;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
        text: PLATFORM_NAME[0],
        value: 1,
      },
      {
        text: PLATFORM_NAME[1],
        value: 2,
      },
      {
        text: PLATFORM_NAME[2],
        value: 3,
      },
      {
        text: PLATFORM_NAME[3],
        value: 4,
      },
      {
        text: PLATFORM_NAME[4],
        value: 5,
      },
      {
        text: PLATFORM_NAME[5],
        value: 6,
      },
      {
        text: PLATFORM_NAME[6],
        value: 7,
      },
      {
        text: PLATFORM_NAME[7],
        value: 8,
      },
    ],
    render: val => PLATFORM_NAME[`${val - 1}`],
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
        text: LIFECYCLE_STATUS[0].status,
        value: 0,
      },
      {
        text: LIFECYCLE_STATUS[1].status,
        value: 1,
      },
      {
        text: LIFECYCLE_STATUS[2].status,
        value: 2,
      },
      {
        text: LIFECYCLE_STATUS[3].status,
        value: 3,
      },
      {
        text: LIFECYCLE_STATUS[4].status,
        value: 4,
      },
      {
        text: LIFECYCLE_STATUS[5].status,
        value: 5,
      },
    ],
    render(val) {
      return <Badge status={LIFECYCLE_STATUS[val].badge} text={LIFECYCLE_STATUS[val].status} />;
    },
  },
  {
    title: '节点类型',
    dataIndex: 'nodeType',
    render(val) {
      return NODE_TYPE[`${parseInt(val, 10) - 1}`];
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
        value: isModify ? selectedItem[0].ipAddress : null,
      }),
      hostname: Form.createFormField({
        value: isModify ? selectedItem[0].hostname : null,
      }),
      systemName: Form.createFormField({
        value: isModify ? selectedItem[0].systemName : null,
      }),
      lifecycleStatus: Form.createFormField({
        value: isModify
          ? selectedItem[0].lifecycleStatus && selectedItem[0].lifecycleStatus.toString()
          : null,
      }),
      platformName: Form.createFormField({
        value: isModify
          ? selectedItem[0].platformName && selectedItem[0].platformName.toString()
          : null,
      }),
      businessLine: Form.createFormField({
        value: isModify
          ? selectedItem[0].businessLine && selectedItem[0].businessLine.toString()
          : null,
      }),
      nodeType: Form.createFormField({
        value: isModify ? selectedItem[0].nodeType && selectedItem[0].nodeType.toString() : null,
      }),
      isVirtualized: Form.createFormField({
        value: isModify
          ? selectedItem[0].isVirtualized && selectedItem[0].isVirtualized.toString()
          : null,
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
        value: isModify
          ? selectedItem[0].maintainer && selectedItem[0].maintainer.toString()
          : null,
      }),
      currentStatus: Form.createFormField({
        value: isModify
          ? selectedItem[0].currentStatus && selectedItem[0].currentStatus.toString()
          : null,
      }),
      applicant: Form.createFormField({
        value: isModify ? selectedItem[0].applicant && selectedItem[0].applicant : null,
      }),
      approver: Form.createFormField({
        value: isModify ? selectedItem[0].approver && selectedItem[0].approver.toString() : null,
      }),
      expiredDate: Form.createFormField({
        value: isModify
          ? selectedItem[0].expiredDate && moment(selectedItem[0].expiredDate.toString())
          : null,
      }),
      projectCode: Form.createFormField({
        value: isModify
          ? selectedItem[0].projectCode && selectedItem[0].projectCode.toString()
          : null,
      }),
      remarks: Form.createFormField({
        value: isModify ? selectedItem[0].remarks && selectedItem[0].remarks : null,
      }),
    };
  },
})(props => {
  const {
    modalVisible,
    modalTitle,
    selectedRows,
    form,
    handleAdd,
    handleUpdate,
    handleModalVisible,
  } = props;
  if (modalVisible && modalTitle === '修改信息') {
    const selectedItem = selectedRows[0];
    const values = {};
    Object.keys(selectedItem)
      .filter(k => selectedItem[k] !== null)
      .forEach(k => {
        values[k] = selectedItem[k];
      });
    // console.log('values: ', values);
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const values = {
        ...fieldsValue,
        expiredDate: fieldsValue.expiredDate && fieldsValue.expiredDate.format('YYYY-MM-DD'),
      };

      if (modalTitle === '修改信息') {
        handleUpdate(values);
      } else {
        handleAdd(values);
      }
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
                  <Option value="4">{LIFECYCLE_STATUS[4].status}</Option>
                  <Option value="3">{LIFECYCLE_STATUS[3].status}</Option>
                  <Option value="2">{LIFECYCLE_STATUS[2].status}</Option>
                  <Option value="1">{LIFECYCLE_STATUS[1].status}</Option>
                  <Option value="0">{LIFECYCLE_STATUS[0].status}</Option>
                  <Option value="5">{LIFECYCLE_STATUS[5].status}</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="业务域">
              {form.getFieldDecorator('businessLine')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">{BUSINESS_LINE[0]}</Option>
                  <Option value="1">{BUSINESS_LINE[1]}</Option>
                  <Option value="2">{BUSINESS_LINE[2]}</Option>
                  <Option value="3">{BUSINESS_LINE[3]}</Option>
                  <Option value="4">{BUSINESS_LINE[4]}</Option>
                  <Option value="5">{BUSINESS_LINE[5]}</Option>
                  <Option value="6">{BUSINESS_LINE[6]}</Option>
                  <Option value="7">{BUSINESS_LINE[7]}</Option>
                  <Option value="8">{BUSINESS_LINE[8]}</Option>
                  <Option value="9">{BUSINESS_LINE[9]}</Option>
                  <Option value="10">{BUSINESS_LINE[10]}</Option>
                  <Option value="11">{BUSINESS_LINE[11]}</Option>
                  <Option value="12">{BUSINESS_LINE[12]}</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="平台名称">
              {form.getFieldDecorator('platformName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">{PLATFORM_NAME[0]}</Option>
                  <Option value="2">{PLATFORM_NAME[1]}</Option>
                  <Option value="3">{PLATFORM_NAME[2]}</Option>
                  <Option value="4">{PLATFORM_NAME[3]}</Option>
                  <Option value="5">{PLATFORM_NAME[4]}</Option>
                  <Option value="6">{PLATFORM_NAME[5]}</Option>
                  <Option value="7">{PLATFORM_NAME[6]}</Option>
                  <Option value="8">{PLATFORM_NAME[7]}</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="节点类型">
              {form.getFieldDecorator('nodeType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">{NODE_TYPE[0]}</Option>
                  <Option value="2">{NODE_TYPE[1]}</Option>
                  <Option value="3">{NODE_TYPE[2]}</Option>
                  <Option value="4">{NODE_TYPE[3]}</Option>
                  <Option value="5">{NODE_TYPE[4]}</Option>
                  <Option value="6">{NODE_TYPE[5]}</Option>
                  <Option value="7">{NODE_TYPE[6]}</Option>
                  <Option value="8">{NODE_TYPE[7]}</Option>
                  <Option value="9">{NODE_TYPE[8]}</Option>
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
                  <Option value="1">{HA_TYPE[1]}</Option>
                  <Option value="2">{HA_TYPE[2]}</Option>
                  <Option value="3">{HA_TYPE[3]}</Option>
                  <Option value="4">{HA_TYPE[4]}</Option>
                  <Option value="5">{HA_TYPE[5]}</Option>
                  <Option value="6">{HA_TYPE[6]}</Option>
                  <Option value="7">{HA_TYPE[7]}</Option>
                  <Option value="0">{HA_TYPE[0]}</Option>
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
                  <Option value="1">{OS_RELEASE[0]}</Option>
                  <Option value="2">{OS_RELEASE[1]}</Option>
                  <Option value="3">{OS_RELEASE[2]}</Option>
                  <Option value="4">{OS_RELEASE[3]}</Option>
                  <Option value="5">{OS_RELEASE[4]}</Option>
                  <Option value="6">{OS_RELEASE[5]}</Option>
                  <Option value="7">{OS_RELEASE[6]}</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="机房位置">
              {form.getFieldDecorator('location')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="M01">{LOCATION.M01}</Option>
                  <Option value="M03">{LOCATION.M03}</Option>
                  <Option value="M08">{LOCATION.M08}</Option>
                  <Option value="M10">{LOCATION.M10}</Option>
                  <Option value="KTY">{LOCATION.KTY}</Option>
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
                  <Option value="1">{COMPANY[0]}</Option>
                  <Option value="2">{COMPANY[1]}</Option>
                  <Option value="3">{COMPANY[2]}</Option>
                  <Option value="4">{COMPANY[3]}</Option>
                  <Option value="5">{COMPANY[4]}</Option>
                  <Option value="6">{COMPANY[5]}</Option>
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
                  <Option value="1">{CURRENT_STATUS[0]}</Option>
                  <Option value="2">{CURRENT_STATUS[1]}</Option>
                  <Option value="3">{CURRENT_STATUS[2]}</Option>
                  <Option value="4">{CURRENT_STATUS[3]}</Option>
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
                  <Option value="1">{APPROVER[0]}</Option>
                  <Option value="2">{APPROVER[1]}</Option>
                  <Option value="3">{APPROVER[2]}</Option>
                  <Option value="4">{APPROVER[3]}</Option>
                  <Option value="5">{APPROVER[4]}</Option>
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
                  <Option value="D6">{PROJECT_CODE.D6}</Option>
                  <Option value="D7">{PROJECT_CODE.D7}</Option>
                  <Option value="D8">{PROJECT_CODE.D8}</Option>
                  <Option value="D12">{PROJECT_CODE.D12}</Option>
                  <Option value="D13">{PROJECT_CODE.D13}</Option>
                  <Option value="D14">{PROJECT_CODE.D14}</Option>
                  <Option value="D15">{PROJECT_CODE.D15}</Option>
                  <Option value="D16">{PROJECT_CODE.D16}</Option>
                  <Option value="D17">{PROJECT_CODE.D17}</Option>
                  <Option value="D18">{PROJECT_CODE.D18}</Option>
                  <Option value="D19">{PROJECT_CODE.D19}</Option>
                  <Option value="D20">{PROJECT_CODE.D20}</Option>
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
    viewModalVisible: false,
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

  onViewCancel = () => {
    this.setState({
      viewModalVisible: false,
    });
  };

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
        expiredDate: fieldsValue.expiredDate && fieldsValue.expiredDate.format('YYYY-MM-DD'),
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
    message.success('添加成功', 4);
    this.setState({
      modalVisible: false,
    });
    setTimeout(
      () =>
        this.props.dispatch({
          type: 'app/fetch',
          payload: this.state.formValues,
        }),
      800
    );
  };

  handleUpdate = fields => {
    this.props.dispatch({
      type: 'app/update',
      payload: {
        ...fields,
      },
    });
    message.success('更新成功', 4);
    this.setState({
      modalVisible: false,
      selectedRows: [],
    });
    setTimeout(
      () =>
        this.props.dispatch({
          type: 'app/fetch',
          payload: this.state.formValues,
        }),
      1000
    );
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
        ids: this.state.selectedRows.map(row => row.id),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
    message.success('删除成功');
    setTimeout(
      () =>
        this.props.dispatch({
          type: 'app/fetch',
          payload: this.state.formValues,
        }),
      1000
    );
  };

  handleClaim = () => {
    this.props.dispatch({
      type: 'app/claim',
      payload: {
        ids: this.state.selectedRows.map(row => row.id),
        maintainer: getCurrentUser(),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
    message.success('已成功认领');
    setTimeout(
      () =>
        this.props.dispatch({
          type: 'app/fetch',
          payload: this.state.formValues,
        }),
      1000
    );
  };

  handleViewModalVisible = flag => {
    const { selectedRows } = this.state;
    if (
      selectedRows.length > 0 &&
      selectedRows[0].isVirtualized != null &&
      selectedRows[0].isVirtualized === 1
    ) {
      this.props.dispatch({
        type: 'app/queryVm',
        payload: selectedRows[0].ipAddress,
      });
    }
    this.setState({
      viewModalVisible: !!flag,
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
                  <Option value="4">{LIFECYCLE_STATUS[4]}</Option>
                  <Option value="3">{LIFECYCLE_STATUS[3]}</Option>
                  <Option value="2">{LIFECYCLE_STATUS[2]}</Option>
                  <Option value="1">{LIFECYCLE_STATUS[1]}</Option>
                  <Option value="0">{LIFECYCLE_STATUS[0]}</Option>
                  <Option value="5">{LIFECYCLE_STATUS[5]}</Option>
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
                  <Option value="1">{NODE_TYPE[0]}</Option>
                  <Option value="2">{NODE_TYPE[1]}</Option>
                  <Option value="3">{NODE_TYPE[2]}</Option>
                  <Option value="4">{NODE_TYPE[3]}</Option>
                  <Option value="5">{NODE_TYPE[4]}</Option>
                  <Option value="6">{NODE_TYPE[5]}</Option>
                  <Option value="7">{NODE_TYPE[6]}</Option>
                  <Option value="8">{NODE_TYPE[7]}</Option>
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
    const { selectedRows, modalVisible, modalTitle, viewModalVisible } = this.state;
    const disks =
      data.vmInfo && data.vmInfo.diskUsage
        ? Object.entries(data.vmInfo.diskUsage).map(arr => `${arr[0]} : ${arr[1]}`)
        : [];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
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
                      <Button onClick={() => this.handleViewModalVisible(true)}>
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
                  <Button onClick={() => this.handleClaim()}>
                    <Icon type="heart-o" />认领
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
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          modalTitle={modalTitle}
          selectedRows={selectedRows}
        />
        <Modal
          width="820px"
          title="查看详情"
          visible={viewModalVisible}
          onCancel={this.onViewCancel}
          footer={[
            <Button key="close" onClick={this.onViewCancel}>
              关闭
            </Button>,
          ]}
        >
          <DescriptionList size="large" title="" col={3} gutter={32}>
            <Description term="主机名称">
              {selectedRows.length > 0 ? selectedRows[0].hostname : ''}
            </Description>
            <Description term="IP地址">
              {selectedRows.length > 0 ? selectedRows[0].ipAddress : ''}
            </Description>
            <Description term="系统名称">
              {selectedRows.length > 0 ? selectedRows[0].systemName : ''}
            </Description>
            <Description term="系统类型">
              {selectedRows.length > 0
                ? selectedRows[0].lifecycleStatus != null
                  ? LIFECYCLE_STATUS[selectedRows[0].lifecycleStatus].status
                  : ''
                : ''}
            </Description>
            <Description term="节点类型">
              {selectedRows.length > 0
                ? selectedRows[0].nodeType != null
                  ? NODE_TYPE[parseInt(selectedRows[0].nodeType, 10) - 1]
                  : ''
                : ''}
            </Description>
            <Description term="平台名称">
              {selectedRows.length > 0
                ? selectedRows[0].platformName != null
                  ? PLATFORM_NAME[parseInt(selectedRows[0].platformName, 10) - 1]
                  : ''
                : ''}
            </Description>
            <Description term="业务域">
              {selectedRows.length > 0 ? selectedRows[0].businessLine : ''}
            </Description>
            <Description term="项目名称">
              {selectedRows.length > 0
                ? selectedRows[0].projectCode != null
                  ? PROJECT_CODE[selectedRows[0].projectCode]
                  : ''
                : ''}
            </Description>
            <Description term="产品类型">
              {selectedRows.length > 0 ? selectedRows[0].product : ''}
            </Description>
            <Description term="操作系统">
              {selectedRows.length > 0
                ? selectedRows[0].osRelease != null
                  ? OS_RELEASE[selectedRows[0].osRelease - 1]
                  : ''
                : ''}
            </Description>
            <Description term="是否虚机">
              {selectedRows.length > 0
                ? selectedRows[0].isVirtualized != null
                  ? selectedRows[0].isVirtualized === 1
                    ? '虚拟机'
                    : '物理机'
                  : ''
                : ''}
            </Description>
            <Description term="HA类型">
              {selectedRows.length > 0
                ? selectedRows[0].haType != null
                  ? HA_TYPE[selectedRows[0].haType]
                  : ''
                : ''}
            </Description>
            <Description term="机房位置">
              {selectedRows.length > 0
                ? selectedRows[0].location != null
                  ? LOCATION[selectedRows[0].location]
                  : ''
                : ''}
            </Description>
            <Description term="VLAN ID">
              {selectedRows.length > 0 ? selectedRows[0].vlanId : ''}
            </Description>
            <Description term="维护单位">
              {selectedRows.length > 0
                ? selectedRows[0].company != null
                  ? COMPANY[selectedRows[0].company - 1]
                  : ''
                : ''}
            </Description>
            <Description term="管理员">
              {selectedRows.length > 0 ? selectedRows[0].maintainer : ''}
            </Description>
            <Description term="当前状态">
              {selectedRows.length > 0 ? selectedRows[0].currentStatus : ''}
            </Description>
            <Description term="申请人">
              {selectedRows.length > 0 ? selectedRows[0].applicant : ''}
            </Description>
            <Description term="审批人">
              {selectedRows.length > 0
                ? selectedRows[0].approver != null
                  ? APPROVER[selectedRows[0].approver - 1]
                  : ''
                : ''}
            </Description>
            <Description term="过期时间">
              {selectedRows.length > 0 ? selectedRows[0].expiredDate : ''}
            </Description>
            <Description term="备注">
              {selectedRows.length > 0 ? selectedRows[0].remarks : ''}
            </Description>
            <Description term="创建者">
              {selectedRows.length > 0 ? selectedRows[0].creator : ''}
            </Description>
            <Description term="创建时间">
              {selectedRows.length > 0 ? selectedRows[0].createTime : ''}
            </Description>
            <Description term="更新者">
              {selectedRows.length > 0 ? selectedRows[0].reviser : ''}
            </Description>
            <Description term="更新时间">
              {selectedRows.length > 0
                ? selectedRows[0].updateTime != null
                  ? selectedRows[0].updateTime.toString().replace('T', ' ')
                  : ''
                : ''}
            </Description>
          </DescriptionList>

          {data.vmInfo && (
            <DescriptionList size="large" title="" col={3} gutter={32} className={styles.mt20}>
              <Description term="启动时间">{data.vmInfo.bootSince}</Description>
              <Description term="ESXi主机">{data.vmInfo.esxiHost}</Description>
              <Description term="域名">{data.vmInfo.guestDomainName}</Description>
              <Description term="操作系统">{data.vmInfo.guestOsVersion}</Description>
              <Description term="vCPU数量">{data.vmInfo.numCpu}</Description>
              <Description term="内存大小">{`${data.vmInfo.memoryGb}GB`}</Description>
              <Description term="vDisk数量">{data.vmInfo.numVirtualDisk}</Description>
              <Description term="电源状态">{data.vmInfo.powerState}</Description>
              <Description term="guest状态">{data.vmInfo.guestState}</Description>
              <Description term="总体状态">{data.vmInfo.overallStatus}</Description>
              <Description term="FT状态">{data.vmInfo.ftState}</Description>

              <Description term="磁盘使用率">
                <List
                  size="small"
                  dataSource={disks}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Description>
            </DescriptionList>
          )}
        </Modal>
      </PageHeaderLayout>
    );
  }
}
