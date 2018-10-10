import React, { Component, Fragment } from 'react';
import { Card } from 'antd';
import DescriptionList from 'components/DescriptionList';
import SockJsClient from 'react-stomp';

const { Description } = DescriptionList;

export default class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  sendMessage = (topic, msg, headers) => {
    this.clientRef.sendMessage(topic, msg, headers);
  };
  updateCount = msg => {
    this.setState({
      count: msg,
    });
  };

  render() {
    return (
      <Fragment>
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <div>
            <SockJsClient
              url="http://localhost:8002/tools/passwd"
              // headers={{ Authorization: `Bearer ${getAccessToken()}` }}
              // subscribeHeaders={{ Authorization: `Bearer ${getAccessToken()}` }}
              topics={['/topic/process']}
              onMessage={this.updateCount}
              ref={client => {
                this.clientRef = client;
              }}
            />
          </div>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户姓名">曲丽丽</Description>
            <Description term="会员卡号">32943898021309809423</Description>
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="当前计数">{this.state.count.toString()}</Description>
            <Description term="职位">前端交互设计师</Description>
          </DescriptionList>
        </Card>
      </Fragment>
    );
  }
}
