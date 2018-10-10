import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Button, Divider, Transfer, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const toolsItemLayout = {
  labelCol: {
    span: 20,
  },
  wrapperCol: {
    span: 24,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  state = {
    targetKeys: [],
  };

  componentDidMount() {
    const { dispatch, user: { currentUser } } = this.props;
    dispatch({
      type: 'tools/fetch',
      payload: {
        maintainer: currentUser.realName,
      },
    });
  }

  filterOption = (inputValue, option) => {
    return option.ipAddress.includes(inputValue) || option.hostname.includes(inputValue);
  };

  handleChange = (targetKeys) => {
/*    console.log('targetKeys: ', targetKeys);
    this.setState({ targetKeys }); */
    this.props.dispatch({
      type: 'tools/saveSelectedHosts',
      payload: targetKeys,
    });
  };

  render() {
    const { form, dispatch, tools: { hosts, selectedHosts } } = this.props;
    const { getFieldDecorator } = form;

    const submitToNext = () => {
      dispatch(routerRedux.push('/tools/passwd-mgt/step2'));
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...toolsItemLayout} >
            {getFieldDecorator('ids')(
              <Transfer
                dataSource={hosts}
                showSearch
                rowKey={item => `${item.id}#${item.hostname}#${item.ipAddress}`}
                listStyle={{
                  width: 300,
                  height: 420,
                  textAlign: 'left',
                }}
                filterOption={this.filterOption}
                // targetKeys={this.state.targetKeys}
                targetKeys={selectedHosts}
                onChange={this.handleChange}
                render={item => `${item.ipAddress} - ${item.hostname}`}
              />
            )}
          </Form.Item>
          <Divider style={{ margin: '24px 0' }} />
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: toolsItemLayout.wrapperCol.span,
                offset: toolsItemLayout.labelCol.span,
              },
            }}
            label=""
            style={{ textAlign: 'left' }}
          >
            {selectedHosts.length > 0 ? (
              <Button type="primary" onClick={submitToNext}>
                下一步<Icon type="right" />
              </Button>
            ) : (
              <Button type="primary" disabled>
                下一步<Icon type="right" />
              </Button>
            )}
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>特别说明</h3>
          <p>
            出于安全考虑，每个用户只能修改自己名下主机的密码，如列表中没有您要修改密码的主机，请先前往<a href="/app/hosts">主机信息管理</a>页面，找出并认领您的主机。
          </p>
          <p>
            暂时只支持Linux平台主机密码修改，后续会陆续推出Windows、Oracle等系统的密码修改工具，敬请期待！
          </p>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ user, tools }) => ({
  tools,
  user,
}))(Step1);
