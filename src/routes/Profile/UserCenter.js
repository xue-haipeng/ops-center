import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Button,
  Icon,
  Card,
  Tooltip,
  Avatar,
  Modal,
  Form,
  Input,
  Cascader,
  Select,
  Upload,
  message,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import CustForm from '../Forms/CustForm';
import { getCurrentUser, setCurrentUser } from '../../utils/authority';

const { Description } = DescriptionList;
const FormItem = Form.Item;

/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const Option = Select.Option;

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
        ],
      },
    ],
  },
];

/* eslint no-shadow: ["error", { "allow": ["user"] }] */
@connect(({ user, loading }) => ({
  user,
  loading: loading.effects['user/fetchCurrent'],
}))
@Form.create()
export default class UserCenter extends Component {
  state = {
    visible: false,
    passwdModalVisible: false,
    imgUrl: '',
    loading: false,
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
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showPassModal = () => {
    this.setState({
      passwdModalVisible: true,
    });
  };
  handleOk = e => {
    this.handleSubmit(e);
    this.setState({
      visible: false,
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
        this.props.dispatch({
          type: 'user/updateAccount',
          payload: values,
        });
        if (getCurrentUser() !== values.username) {
          setCurrentUser(values.username);
        }
        setTimeout(() => {
          this.props.dispatch({
            type: 'user/fetchCurrent',
          });
        }, 500);
      } else {
        message.error(err);
      }
    });
  };
  handlePassSubmit = values => {
    this.props.dispatch({
      type: 'user/changePasswd',
      payload: values,
    });
    this.setState({
      passwdModalVisible: false,
    });
  };

  render() {
    const { currentUser } = this.props.user;
    const { id, username, realName, avatar, mobile, company, department, mail, team } = currentUser;
    const { getFieldDecorator } = this.props.form;

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
      <Fragment>
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户名">{username}</Description>
            <Description term="姓名">{realName}</Description>
            <Description term="邮箱">{mail}</Description>
            <Description term="单位">{company}</Description>
            <Description term="部门">{department}</Description>
            <Description term="项目组">{team}</Description>
            <Description term="手机号码">{mobile}</Description>
            <Description term="头像">
              {this.state.imgUrl ? <Avatar src={this.state.imgUrl} /> : <Avatar src={avatar} />}
            </Description>
          </DescriptionList>
          <Button type="primary" onClick={this.showModal} style={{ margin: '10px' }}>
            修改用户信息
          </Button>
          <Button type="danger" onClick={this.showPassModal} style={{ margin: '10px' }}>
            修改登陆密码
          </Button>
          <Modal
            title="修改个人信息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form
              ref={form => {
                this.userForm = form;
              }}
            >
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
                    <Tooltip title="JPG/PNG格式，小于200Kb">
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
                        <div className="ant-upload-text">Upload</div>
                      </div>
                    )}
                  </Upload>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="用户名">
                {getFieldDecorator('username', {
                  initialValue: username,
                  rules: [{ required: true, message: '请填写用户名', whitespace: true }],
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="邮箱">
                {getFieldDecorator('mailPrefix', {
                  initialValue: mail && mail.indexOf('@') > -1 ? mail.split('@')[0] : '',
                  rules: [
                    {
                      required: true,
                      message: '请填写请填写邮箱',
                    },
                  ],
                })(<Input addonAfter={suffixSelector} style={{ width: '100%' }} />)}
              </FormItem>
              <FormItem {...formItemLayout} label="项目组">
                {getFieldDecorator('team', {
                  initialValue:
                    company || department || team
                      ? [company, department, team]
                      : ['中油瑞飞', '云计算业务部', '平台应用组'],
                })(<Cascader options={teams} />)}
              </FormItem>
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('mobile', {
                  initialValue: mobile,
                })(<Input />)}
              </FormItem>
            </Form>
          </Modal>

          <Modal
            title="修改登陆密码"
            visible={this.state.passwdModalVisible}
            footer={null}
            onCancel={this.handlePassCancel}
          >
            <CustForm
              handlePassSubmit={this.handlePassSubmit}
              handlePassCancel={this.handlePassCancel}
              accountId={id}
            />
          </Modal>
        </Card>
      </Fragment>
    );
  }
}
