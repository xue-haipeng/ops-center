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

@Form.create({
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        value: props.tools.username,
      }),
      password: Form.createFormField({
        value: props.tools.newPassword,
      }),
    }
  },
})
class Step4 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  updateResults = msg => {
    const results = this.state.results.concat(msg);
    this.setState({
      results,
    });
    console.log('results: ', results);
  };

  resetResults = () => {
    this.setState({
      results: [],
    });
  };

  render() {
    const { form, tools: { selectedHosts, username }, user: { currentUser }, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/tools/passwd-mgt/step3'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const hosts = [];
          for (let i = 0; i < selectedHosts.length; i += 1) {
            hosts.push({ id: selectedHosts[i].split('#')[0], hostname: selectedHosts[i].split('#')[1], ipAddress: selectedHosts[i].split('#')[2]});
          }
          this.resetResults();
          dispatch({
            type: 'tools/verifyPassword',
            payload: {
              ...values,
              currUser: currentUser.username,
              hosts,
            },
          });
        }
      });
    };

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Row gutter={16} style={{ margin: '0 16px'}}>
          <Col lg={9} md={9} sm={9} xs={24}>
            <Form.Item {...toolsItemLayout} style={{ maxWidth: 450, marginLeft: 30 }} label="当前用户" required>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名称',
                  },
                ],
              })(<Input type="text" autoComplete="off" />)}
            </Form.Item>
          </Col>
          <Col lg={9} md={9} sm={9} xs={24}>
            <Form.Item {...toolsItemLayout} style={{ maxWidth: 450, marginLeft: 8 }} label="当前密码" required>
              {getFieldDecorator('password', {
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
              style={{ maxWidth: 200, marginLeft: 16 }}
              label=""
            >
              <Button type="primary" onClick={onValidateForm} loading={submitting}>
                开始验证
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ margin: '24px 0' }} />
        <p style={{ textAlign: 'left' }}>当前共<span style={{ fontSize: 'larger' }}>{selectedHosts.length}</span>台主机</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {this.state.results.map(host => (
            <li className={styles.recordLi} key={host.ip}>
              <span className={styles.recordSpan}>{host.ip}</span>
              <span className={styles.recordSpan}>{host.hostname}</span>
              <span className={styles.recordSpan}>{host.username}</span>
              {host.passed
                ? (<span style={{ color: 'green' }}>OK</span>)
                : (<span style={{ color: 'red' }}>Failed</span>)}
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
        </Form.Item>
        <SockJsClient
          url="http://11.11.47.72:8002/tools/passwd"
          // headers={{ Authorization: `Bearer ${getAccessToken()}` }}
          // subscribeHeaders={{ Authorization: `Bearer ${getAccessToken()}` }}
          topics={[`/topic/verify_password_${currentUser.username}`]}
          onMessage={this.updateResults}
          ref={client => {
            this.clientRef = client;
          }}
        />
      </Form>
    );
  }
}

export default connect(({ tools, user, loading }) => ({
  submitting: loading.effects['tools/submitStepForm'],
  tools,
  user,
}))(Step4);
