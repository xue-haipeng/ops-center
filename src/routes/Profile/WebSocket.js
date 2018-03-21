import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider } from 'antd';
import DescriptionList from 'components/DescriptionList';
import SockJsClient from 'react-stomp';

const { Description } = DescriptionList;

export default class UserCenter extends Component {

  sendMessage = (msg) => {
    this.clientRef.sendMessage('/topic/process', msg);
  }

  render() {
    return (
      <Fragment>
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <div>
            <SockJsClient url='http://localhost:8080/ws' topics={['/topic/process']}
                          onMessage={(msg) => { console.log(msg); }}
                          ref={ (client) => { this.clientRef = client }} />
          </div>
        </Card>
      </Fragment>
    );
  }
}
