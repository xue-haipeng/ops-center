import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip,
  Divider, Avatar, Modal, Form, Input, Cascader, Select, Checkbox, AutoComplete } from 'antd';
import DescriptionList from 'components/DescriptionList';
import user from "../../models/user"

const { Description } = DescriptionList;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

@connect(({ user, loading }) => ({
  user,
  loading: loading.effects['user/fetchCurrent'],
}))

@Form.create()
export default class UserCenter extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
  }
  showModal = () => {
    this.setState(prevState => ({
      visible: true,
    }));
  }
  handleOk = (e) => {
    console.log(e);
    this.setState(prevState => ({
      visible: false,
    }));
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState(prevState => ({
      visible: false,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      confirmDirty: this.state.confirmDirty || !!value
    }));
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { user, loading } = this.props;
    const { name, avatar, mobile, mail, team } = user.currentUser;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Fragment>
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户姓名">{name}</Description>
            <Description term="手机号码">{mobile}</Description>
            <Description term="邮箱">{mail}</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="项目组">{team}</Description>
            <Description term="职位">前端交互设计师</Description>
            <Description term="头像"><Avatar src={avatar} /></Description>
          </DescriptionList>
          <Button type="primary" onClick={this.showModal}>修改</Button>
          <Modal
            title="个人信息修改"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="邮箱"
              >
                {getFieldDecorator('email', {
                  initialValue: mail,
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="密码"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="确认密码"
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
              昵称&nbsp;
                    <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                )}
              >
                {getFieldDecorator('nickname', {
                  initialValue: name,
                  rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="城市"
              >
                {getFieldDecorator('residence', {
                  initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                  rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                })(
                  <Cascader options={residences} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机号"
              >
                {getFieldDecorator('phone', {
                  initialValue: mobile,
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="网站"
              >
                {getFieldDecorator('website', {
                  rules: [{ required: true, message: 'Please input website!' }],
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                    placeholder="website"
                  >
                    <Input />
                  </AutoComplete>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Captcha"
                extra="We must make sure that your are a human."
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: 'Please input the captcha you got!' }],
                    })(
                      <Input />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button>Get captcha</Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Modal>
        </Card>
      </Fragment>
    );
  }
}
