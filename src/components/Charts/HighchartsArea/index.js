import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import autoHeight from '../autoHeight';
import styles from './index.less';

@autoHeight()
export default class HighchartsArea extends React.Component {
  render() {
    const { data } = this.props;
    const options = {
      chart: {
        zoomType: 'x',
      },
      title: {
        text: '',
      },
      /* subtitle: {
        text: document.ontouchstart === undefined ?
          '鼠标拖动可以进行缩放' : '手势操作进行缩放',
      }, */
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%m-%d',
          week: '%m-%d',
          month: '%Y-%m',
          year: '%Y',
        },
      },
      tooltip: {
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%Y-%m-%d',
          week: '%m-%d',
          month: '%Y-%m',
          year: '%Y',
        },
      },
      yAxis: {
        title: {
          text: '日志条数',
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
            ],
          },
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      series: [{
        type: 'area',
        name: '日志生成量（条）',
        data,
      }],
    };

    return (
      <div className={styles.mapChart}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          style={{ width: '100%', height: '90%' }}
        />
      </div>
    );
  }
}
