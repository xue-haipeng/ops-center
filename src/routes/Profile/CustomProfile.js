import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Rate,
  Steps,
  Button,
  message,
  Switch,
  DatePicker,
  Modal,
  Timeline,
} from 'antd';
import { WaterWave } from 'components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CustomProfile.less';

const CheckboxGroup = Checkbox.Group;

/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const Step = Steps.Step;
const { RangePicker } = DatePicker;

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门',
          },
        ],
      },
    ],
  },
];

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

export default class CustomProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      visible: false,
    };
  }
  onSelect = value => {
    console.log(value);
  };
  onChecked = checkedValues => {
    console.log(checkedValues);
  };
  onSwitch = checked => {
    console.log(checked);
  };
  onChangeTime = (value, dateString) => {
    console.log(`selected time: ${value}, formatted time: ${dateString}`);
  };
  onChangedTime = value => {
    console.log(`onOk: ${value}`);
  };
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { current } = this.state;
    return (
      <PageHeaderLayout title="自定义页面">
        <Row gutter={16}>
          <Col span={16}>
            <Carousel autoplay className={styles.carousel}>
              <div style={{ height: 242 }} className={styles.img1}>
                <h3>1</h3>
              </div>
              <div style={{ height: 242 }} className={styles.img2}>
                <h3>2</h3>
              </div>
              <div style={{ height: 242 }} className={styles.img3}>
                <h3>3</h3>
              </div>
              <div style={{ height: 242 }} className={styles.img4}>
                <h3>4</h3>
              </div>
            </Carousel>
          </Col>
          <Col span={8}>
            <Card title="表单控件" bordered={false}>
              <Cascader options={options} onChange={this.onSelect} placeholder="Please select" />
              <CheckboxGroup className={styles.checkGroup} onChange={this.onChecked}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B">B</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                </Row>
              </CheckboxGroup>
              <Rate allowHalf defaultValue={2.5} />
              <Switch defaultChecked onChange={this.onSwitch} style={{ marginLeft: 15 }} />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={16}>
            <Card title="进度条示例" bordered={false}>
              <Steps current={current}>
                {steps.map(item => <Step key={item.title} title={item.title} />)}
              </Steps>
              <div className={styles.stepsContent}>{steps[this.state.current].content}</div>
              <div className={styles.stepsAction}>
                {this.state.current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    下一步
                  </Button>
                )}
                {this.state.current === steps.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                  </Button>
                )}
                {this.state.current > 0 && (
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    上一步
                  </Button>
                )}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="图标示例" bordered={false}>
              <div style={{ textAlign: 'center' }}>
                <WaterWave height={161} title="补贴资金剩余" percent={34} />
              </div>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['开始时间', '结束时间']}
                onChange={this.onChangeTime}
                onOk={this.onChangedTime}
                style={{ width: 320, marginTop: 15 }}
              />
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <Button type="primary" onClick={this.showModal} style={{ marginRight: 12 }}>
                  弹出Modal
                </Button>
                <Button>普通按钮</Button>
                <Modal
                  title="Ant Design Pro开发步骤"
                  visible={this.state.visible}
                  onOk={this.hideModal}
                  onCancel={this.hideModal}
                  okText="确认"
                  cancelText="取消"
                >
                  <Timeline>
                    <Timeline.Item>
                      src/routes目录下创建文件夹,并在其中建立相应的js、less文件；
                    </Timeline.Item>
                    <Timeline.Item>
                      src/common/router.js里添加与新建js文件对应的路由条目；
                    </Timeline.Item>
                    <Timeline.Item>
                      src/common/menu.js里添加相应菜单，链接对应新建路由；
                    </Timeline.Item>
                    <Timeline.Item>
                      src/models目录下创建dva Model，添加state、reduces、effects、subscriptions；
                    </Timeline.Item>
                    <Timeline.Item>
                      src/services目录下创建接口方法，通过request库调用后台REST数据。
                    </Timeline.Item>
                  </Timeline>
                </Modal>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
