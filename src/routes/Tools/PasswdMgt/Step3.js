import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Icon, Col, Row } from 'antd';
import { routerRedux } from 'dva/router';
import SockJsClient from 'react-stomp';
import styles from './style.less';
import { getCurrentUser } from '../../../utils/authority';

const toolsItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

@Form.create()
class Step3 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  updateResults = msg => {
    const results = this.state.results.concat({key: this.state.results.length, value: msg});
    this.setState({
      results,
    });
  };

  resetResults = () => {
    this.setState({
      results: [],
    });
  };

  render() {
    const { form, tools: { selectedHosts, username, password }, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/tools/passwd-mgt/step2'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const hosts = [];
          for (let i = 0; i < selectedHosts.length; i += 1) {
            hosts.push({ id: selectedHosts[i].split('#')[0], hostname: selectedHosts[i].split('#')[1], ipAddress: selectedHosts[i].split('#')[2]});
          }
          console.log('values: ', values, ', hosts: ', hosts);
          dispatch({
            type: 'tools/changePassword',
            payload: {
              ...values,
              hosts,
              username,
              password,
            },
          });
        }
      });
    };
    const onNext = () => {
      dispatch(routerRedux.push('/tools/passwd-mgt/step4'));
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Row gutter={16} style={{ margin: '0 16px'}}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <p style={{ textAlign: 'left', paddingTop: 8 }}>当前用户：{username} <span style={{ margin: 10 }} /> 旧密码：{password}</p>
          </Col>
          <Col lg={7} md={7} sm={7} xs={24}>
            <Form.Item {...toolsItemLayout} style={{ maxWidth: 450, marginLeft: 4 }} label="新密码" required>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                ],
              })(<Input type="text" autoComplete="off" />)}
            </Form.Item>
          </Col>
          <Col lg={5} md={5} sm={5} xs={24}>
            <Form.Item
              wrapperCol={{
                xs: { span: 4, offset: 0 },
                sm: { span: 4, offset: 0 },
              }}
              style={{ maxWidth: 200, marginLeft: 16 }}
              label=""
            >
              <Button type="primary" onClick={onValidateForm} loading={submitting}>
                开始修改
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ margin: '24px 0' }} />
        <p style={{ textAlign: 'left' }}>当前共<span style={{ fontSize: 'larger' }}>{selectedHosts.length}</span>台主机</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {this.state.results.map(host => (
            <li className={styles.recordLi} style={{ textAlign: 'left' }} key={host.key}>
              {host.value.toString().split('\n').map(str => (
                <span className={styles.recordSpan} key={Math.random()}>{str}<br /></span>
              ))}
            </li>
          ))}
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
          <Button type="primary" onClick={onNext} style={{ marginLeft: 36 }}>
            下一步<Icon type="right" />
          </Button>
        </Form.Item>
        <SockJsClient
          url="http://localhost:8002/tools/passwd"
          // headers={{ Authorization: `Bearer ${getAccessToken()}` }}
          // subscribeHeaders={{ Authorization: `Bearer ${getAccessToken()}` }}
          topics={[`/topic/update_password_${getCurrentUser()}`]}
          onMessage={this.updateResults}
          ref={client => {
            this.clientRef = client;
          }}
        />
      </Form>
    );
  }
}

export default connect(({ tools, loading }) => ({
  submitting: loading.effects['tools/submitStepForm'],
  tools,
}))(Step3);
