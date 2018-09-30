import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import autoHeight from '../autoHeight';
import styles from './index.less';

@autoHeight()
export default class HighchartsSpline extends React.Component {
  render() {
    const { formatedData } = this.props;
    const options = {
      chart: {
        type: 'spline',
      },
      title: {
        text: '',
        style: {
          fontFamily: 'Microsoft Yahei',
        },
      },
      subtitle: {
        text: '',
        style: {
          fontFamily: 'Microsoft Yahei',
        },
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
        },
        title: {
          text: '',
        },
      },
      yAxis: {
        title: {
          text: 'CPU平均使用率 (%)',
          style: {
            fontFamily: 'Microsoft Yahei',
          },
        },
        min: 0,
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%H:%M}: {point.y:.2f} %',
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: false,
          },
        },
      },
      series: formatedData,
    };
    return (
      <div className={styles.mapChart}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    );
  }
}
