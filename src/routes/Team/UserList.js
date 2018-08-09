import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Modal,
  message,
  Table,
  Divider, Tooltip, Upload, Cascader, Avatar, Badge, Popconfirm,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './UserList.less';
import { AUTHORITIES, USER_STATUS } from './constants';
import { passwordStrengthTest } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ user, loading }) => ({
  user,
  loading: loading.effects['user/fetch'],
}))
@Form.create()
export default class UserList extends PureComponent {
  state = {
    visible: false,
    passwdModalVisible: false,
    imgUrl: '',
    loading: false,
    id: '',
    username: '',
    realName: '',
    avatar: '',
    mobile: '',
    company: '',
    department: '',
    mail: '',
    team: '',
    status,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      console.log('values: ', values);

      dispatch({
        type: 'user/fetch',
        payload: values,
      });
    });
  };

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('仅支持JPG/PNG格式图片');
    }
    const isLt500k = file.size / 1024 < 200;
    if (!isLt500k) {
      message.error('图片大小不能超过200Kb');
    }
    return isJPG && isLt500k;
  };

  handleAvatarChange = info => {
    const { status, response: avatar } = info.file;
    if (status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (status === 'done') {
      this.props.form.setFieldsValue({
        avatar,
      });
      this.setState({
        imgUrl: avatar,
        loading: false,
      });
    }
  };
  normFile = e => {
    return e.file.response;
  };
  showModal = (values) => {
    if (values) {
      this.setState({
        ...values,
      })
    } else {
      this.setState({
        id: '',
        username: '',
        realName: '',
        avatar: '',
        mobile: '',
        company: '',
        department: '',
        mail: '',
        team: '',
        status: '',
        originPass: '',
        confirmPass: '',
        authorities: [],
      })
    }
    this.setState({
      visible: true,
    });
  };
  showPassModal = id => {
    this.setState({
      passwdModalVisible: true,
      currUserId: id,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handlePassCancel = () => {
    this.setState({
      passwdModalVisible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.id) {
          this.props.dispatch({
            type: 'user/updateAccount',
            payload: values,
          });
        } else {
          this.props.dispatch({
            type: 'user/createAccount',
            payload: values,
          })
        }
        setTimeout(() => {
          this.props.dispatch({
            type: 'user/fetch',
          });
        }, 500);
        this.setState({
          visible: false,
        });
      } else {
        message.error(err);
      }
    });
  };
  onOriginPassChange = event => {
    this.setState({
      originPass: event.target.value,
    })
  };
  onConfirmPassChange = event => {
    this.setState({
      confirmPass: event.target.value,
    })
  };

  handlePassSubmit = () => {
    const { originPass, confirmPass } = this.state;
    if (originPass !== confirmPass) {
      message.error('两次输入的密码不相同！');
      return;
    }
    if (originPass == null || originPass === '' || originPass.length < 8) {
      message.error('密码长度不能少于8位！');
      return;
    }
    if (passwordStrengthTest(originPass) < 2 ) {
      message.error('密码强度太弱！');
      return;
    }
    this.props.dispatch({
      type: 'user/changePasswdByAdmin',
      payload: {
        accountId: this.state.currUserId,
        password: originPass,
      },
    });
    this.setState({
      passwdModalVisible: false,
    });
  };
  handleDelete = id => {
    this.props.dispatch({
      type: 'user/deleteUser',
      payload: id,
    });
    setTimeout(() => {
      this.props.dispatch({
        type: 'user/fetch',
      });
    }, 500);
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('realName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="项目组">
              {getFieldDecorator('team')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="平台应用组">平台应用组</Option>
                  <Option value="虚拟化组">虚拟化组</Option>
                  <Option value="存储组">存储组</Option>
                </Select>
              )}
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const columns = [{
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: url => <Avatar src={url} />,
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      // render: text => <a onClick={() => console.log('clicked')}>{text}</a>,
    }, {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    }, {
      title: '项目组',
      dataIndex: 'team',
      key: 'team',
    }, {
      title: '邮箱',
      dataIndex: 'mail',
      key: 'mail',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: val => <Badge status={USER_STATUS[val].status} text={USER_STATUS[val].name} />,
    },  {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.showPassModal(record.id)}>重置密码</a>
          <Divider type="vertical" />
          <a onClick={() => this.showModal(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除此用户？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => this.handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    const teams = [
      {
        value: '中油瑞飞',
        label: '中油瑞飞',
        children: [
          {
            value: '云计算业务部',
            label: '云计算业务部',
            children: [
              {
                value: '平台应用组',
                label: '平台应用组',
              },
              {
                value: '虚拟化组',
                label: '虚拟化组',
              },
              {
                value: '存储组',
                label: '存储组',
              },
            ],
          },
        ],
      },
    ];

    const { list } = this.props.user;
    const { getFieldDecorator } = this.props.form;
    const { id, username, realName, avatar, mobile, company, department, mail, team, status, authorities } = this.state;

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

    const suffixSelector = getFieldDecorator('suffix', {
      initialValue: mail && mail.indexOf('@') > -1 ? `@${mail.split('@')[1]}` : '@cnpc.com.cn',
    })(
      <Select style={{ width: 170 }}>
        <Option value="@cnpc.com.cn">@cnpc.com.cn</Option>
        <Option value="@petrochina.com.cn">@petrochina.com.cn</Option>
      </Select>
    );

    return (
      <PageHeaderLayout title="用户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* <div className={styles.tableListForm}>{this.renderForm()}</div> */}
            <div className={styles.tableListOperator}>
              <Button type="dashed" onClick={() => this.showModal()} style={{ width: '100%' }} icon="plus">
                添加用户
              </Button>
            </div>
            <Table columns={columns} dataSource={list} rowKey="id" />
          </div>
        </Card>
        <Modal
          title="修改用户信息"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('id', {
                initialValue: id,
              })(<Input type="hidden" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                    头像&nbsp;
                  <Tooltip title="JPG/PNG格式，小于200Kb的图片">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('avatar', {
                initialValue: avatar,
                valuePropName: 'file',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="http://11.11.47.72:8001/users/avatar"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleAvatarChange}
                >
                  {this.state.imgUrl ? (
                    <img
                      src={this.state.imgUrl}
                      alt="avatar"
                      style={{ width: '125px', height: '125px' }}
                    />
                  ) : avatar ? (
                    <img src={avatar} alt="avatar" style={{ width: '125px', height: '125px' }} />
                  ) : (
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">上传</div>
                    </div>
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                initialValue: username,
                rules: [{ required: true, message: '请填写用户名', whitespace: true }],
              })(<Input placeholder="建议使用邮箱前缀" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('realName', {
                initialValue: realName,
                rules: [{ required: true, message: '请填写姓名', whitespace: true }],
              })(<Input placeholder="真实姓名" />)}
            </FormItem>
            {!id && (
              <FormItem {...formItemLayout} label="密码">
                {getFieldDecorator('password')(<Input type='password' placeholder="登陆密码" />)}
              </FormItem>
            )}
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator('mailPrefix', {
                initialValue: mail && mail.indexOf('@') > -1 ? mail.split('@')[0] : '',
                rules: [
                  {
                    required: true,
                    message: '请填写请填写邮箱',
                  },
                ],
              })(<Input addonAfter={suffixSelector} placeholder="邮箱前缀" style={{ width: '100%' }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              {getFieldDecorator('authorities', {
                initialValue: authorities,
                rules: [{ required: true, message: '请选择角色' }],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择角色"
                >
                  <Option value={AUTHORITIES[0].code}>{AUTHORITIES[0].name}</Option>
                  <Option value={AUTHORITIES[1].code}>{AUTHORITIES[1].name}</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="项目组">
              {getFieldDecorator('team', {
                initialValue:
                  company || department || team
                    ? [company, department, team]
                    : [],
              })(<Cascader options={teams} placeholder="请选择" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机号">
              {getFieldDecorator('mobile', {
                initialValue: mobile,
              })(<Input placeholder="个人手机号" />)}
            </FormItem>
            {id && (
              <FormItem {...formItemLayout} label="状态">
                {getFieldDecorator('status', {
                  initialValue: status,
                })(
                  <Select
                    placeholder="选择状态"
                  >
                    <Option value={USER_STATUS[0].code}>{USER_STATUS[0].name}</Option>
                    <Option value={USER_STATUS[1].code}>{USER_STATUS[1].name}</Option>
                    <Option value={USER_STATUS[2].code}>{USER_STATUS[2].name}</Option>
                    <Option value={USER_STATUS[3].code}>{USER_STATUS[3].name}</Option>
                  </Select>
                )}
              </FormItem>
            )}
          </Form>
        </Modal>

        <Modal
          title="修改登陆密码"
          visible={this.state.passwdModalVisible}
          onOk={this.handlePassSubmit}
          onCancel={this.handlePassCancel}
        >
          {/* <CustForm
            handlePassSubmit={this.handlePassSubmit}
            handlePassCancel={this.handlePassCancel}
            accountId={id}
          /> */}
          <div style={{ marginRight: '20px' }}>
            <Input.Group>
              <Input type="password" onChange={this.onOriginPassChange} placeholder="输入新密码" style={{ margin: '10px' }} />
              <Input type="password" onChange={this.onConfirmPassChange} placeholder="再次输入密码" style={{ margin: '10px' }} />
            </Input.Group>
          </div>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
