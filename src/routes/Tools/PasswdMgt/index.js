import React, { PureComponent, Fragment } from "react";
import { Route, Redirect, Switch } from "dva/router";
import { Card, Steps } from "antd";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";
import NotFound from "../../Exception/404";
import { getRoutes } from "../../../utils/utils";
import styles from "../style.less";

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split("/");
    switch (pathList[pathList.length - 1]) {
      case "step1":
        return 0;
      case "step2":
        return 1;
      case "step3":
        return 2;
      case "verify":
        return 3;
      default:
        return 0;
    }
  }
  render() {
    const { match, routerData, location } = this.props;
    return (
      <PageHeaderLayout
        title="主机密码批量修改神器"
        tabActiveKey={location.pathname}
        content="只需4步，轻松完成几十上百台Linux主机的密码修改工作。"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="选择主机" />
              <Step title="验证当前密码" />
              <Step title="设置新密码" />
              <Step title="验证新密码" />
            </Steps>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect
                exact
                from="/tools/passwd-mgt"
                to="/tools/passwd-mgt/step1"
              />
              <Route render={NotFound} />
            </Switch>
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}
