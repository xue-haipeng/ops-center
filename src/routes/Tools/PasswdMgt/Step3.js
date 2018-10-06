import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Col, Row, Card } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';

const toolsItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/tools/passwd-mgt/step2'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'tools/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <div style={{ background: 'transparent' }}>
        <Row gutter={24} style={{ paddingBottom: 24, background: '#fff' }}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form layout="horizontal" className={styles.stepForm}>
              <Alert
                closable
                showIcon
                message="请在执行修改密码操作之前，确保已经记下新的密码。"
                style={{ marginBottom: 24, textAlign: 'left' }}
              />
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="付款账户">
                {data.payAccount}
              </Form.Item>
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="收款账户">
                {data.receiverAccount}
              </Form.Item>
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="收款人姓名">
                {data.receiverName}
              </Form.Item>
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="转账金额">
                <span className={styles.money}>{data.amount}</span>
                <span className={styles.uppercase}>（{digitUppercase(data.amount)}）</span>
              </Form.Item>
              <Divider style={{ margin: '24px 0' }} />
              <Form.Item {...toolsItemLayout} label="支付密码" required={false}>
                {getFieldDecorator('password', {
                  initialValue: '123456',
                  rules: [
                    {
                      required: true,
                      message: '需要支付密码才能进行支付',
                    },
                  ],
                })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 8 }}
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: toolsItemLayout.wrapperCol.span, offset: toolsItemLayout.labelCol.span },
                }}
                label=""
              >
                <Button type="primary" onClick={onValidateForm} loading={submitting}>
                  提交
                </Button>
                <Button onClick={onPrev} style={{ marginLeft: 8 }}>
                  上一步
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <div style={{ margin: '12px 0', background: 'transparent' }} />
        <Row gutter={24} style={{ paddingBottom: 24 }}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form layout="horizontal" className={styles.stepForm}>
              <Alert
                closable
                showIcon
                message="请在执行修改密码操作之前，确保已经记下新的密码。"
                style={{ marginBottom: 24, textAlign: 'left' }}
              />
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="付款账户">
                {data.payAccount}
              </Form.Item>
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="收款账户">
                {data.receiverAccount}
              </Form.Item>
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="收款人姓名">
                {data.receiverName}
              </Form.Item>
              <Form.Item {...toolsItemLayout} className={styles.stepFormText} label="转账金额">
                <span className={styles.money}>{data.amount}</span>
                <span className={styles.uppercase}>（{digitUppercase(data.amount)}）</span>
              </Form.Item>
              <Divider style={{ margin: '24px 0' }} />
              <Form.Item {...toolsItemLayout} label="支付密码" required={false}>
                {getFieldDecorator('password', {
                  initialValue: '123456',
                  rules: [
                    {
                      required: true,
                      message: '需要支付密码才能进行支付',
                    },
                  ],
                })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 8 }}
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: toolsItemLayout.wrapperCol.span, offset: toolsItemLayout.labelCol.span },
                }}
                label=""
              >
                <Button type="primary" onClick={onValidateForm} loading={submitting}>
                  提交
                </Button>
                <Button onClick={onPrev} style={{ marginLeft: 8 }}>
                  上一步
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ tools, loading }) => ({
  submitting: loading.effects['tools/submitStepForm'],
  data: tools.step,
}))(Step2);
