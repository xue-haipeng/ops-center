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
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i += 1) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  };

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  };

  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'tools/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/tools/passwd-mgt/step2'));
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...toolsItemLayout} >
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: '请选择主机' }],
            })(
              <Transfer
                dataSource={this.state.mockData}
                showSearch
                listStyle={{
                  width: 300,
                  height: 420,
                  textAlign: 'left',
                }}
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => item.title}
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
            <Button type="primary" onClick={onValidateForm}>
              下一步<Icon type="right" />
            </Button>
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

export default connect(({ tools }) => ({
  data: tools.step,
}))(Step1);
