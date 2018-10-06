import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Icon, Col, Row } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const toolsItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/tools/passwd-mgt/step1'));
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
      <Form layout="horizontal" className={styles.stepForm}>
        <Row gutter={16} style={{ margin: '0 16px'}}>
          <Col lg={18} md={18} sm={18} xs={24}>
            <Form.Item {...toolsItemLayout} style={{ maxWidth: 450, marginLeft: 30 }} label="当前密码" required>
              {getFieldDecorator('password', {
                initialValue: '123456',
                rules: [
                  {
                    required: true,
                    message: '请输入当前密码',
                  },
                ],
              })(<Input type="text" autoComplete="off" />)}
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={6} xs={24}>
            <Form.Item
              wrapperCol={{
                xs: { span: 4, offset: 0 },
                sm: { span: 4, offset: 0 },
              }}
              style={{ maxWidth: 200 }}
              label=""
            >
              <Button type="primary" onClick={onValidateForm} loading={submitting}>
                开始检查
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ margin: '24px 0' }} />
        <ul style={{ listStyle: 'none' }}>
          <li className={styles.recordLi}>
            <span className={styles.recordSpan}>EXOAPS001</span>
            <span className={styles.recordSpan}>10.30.41.140</span>
            <span className={styles.recordSpan}>wladm</span>
            <span style={{ color: 'green' }}>OK</span>
          </li>
          <li className={styles.recordLi}>
            <span className={styles.recordSpan}>EXOAPS001</span>
            <span className={styles.recordSpan}>10.30.41.140</span>
            <span className={styles.recordSpan}>wladm</span>
            <span style={{ color: 'green' }}>OK</span>
          </li>
          <li className={styles.recordLi}>
            <span className={styles.recordSpan}>EXOAPS001</span>
            <span className={styles.recordSpan}>10.30.41.140</span>
            <span className={styles.recordSpan}>wladm</span>
            <span style={{ color: 'green' }}>OK</span>
          </li>
          <li className={styles.recordLi}>
            <span className={styles.recordSpan}>EXOAPS001</span>
            <span className={styles.recordSpan}>10.30.41.140</span>
            <span className={styles.recordSpan}>wladm</span>
            <span style={{ color: 'green' }}>OK</span>
          </li>
          <li className={styles.recordLi}>
            <span className={styles.recordSpan}>EXOAPS001</span>
            <span className={styles.recordSpan}>10.30.41.140</span>
            <span className={styles.recordSpan}>wladm</span>
            <span style={{ color: 'green' }}>OK</span>
          </li>
        </ul>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: toolsItemLayout.wrapperCol.span, offset: toolsItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button onClick={onPrev}>
            <Icon type="left" />上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} style={{ marginLeft: 36 }}>
            下一步<Icon type="right" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ tools, loading }) => ({
  submitting: loading.effects['tools/submitStepForm'],
  data: tools.step,
}))(Step2);
