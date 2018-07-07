import React, { PureComponent } from 'react';
import { Form, Input, Button, Card } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    confirmDirty: false,
  };
  compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  handleConfirmBlur = e => {
    const { value } = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handlePassSubmit(values);
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('accountId', {
              initialValue: this.props.accountId,
            })(<Input type="hidden" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="当前密码">
            {getFieldDecorator('oldPass', {
              rules: [
                {
                  required: true,
                  message: '请输入当前密码',
                },
              ],
            })(<Input type="password" placeholder="请输入当前密码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="新密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input type="password" placeholder="请输入新密码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请再次输入新密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                type="password"
                onBlur={this.handleConfirmBlur}
                placeholder="请再次输入新密码"
              />
            )}
          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button onClick={this.props.handlePassCancel} style={{ marginRight: 16 }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
