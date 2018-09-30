import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import autoHeight from '../autoHeight';
import styles from './index.less';

@autoHeight()
export default class HighchartsGauge extends React.Component {
  render() {
    const { percent } = this.props;
    console.log('percent: ', percent);
    const data = [percent];
    const gaugeOptions = {
      chart: {
        type: 'solidgauge',
      },
      title: null,
      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
      tooltip: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          text: '重点系统主机CPU平均使用率',
          y: -70,
        },
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [{
        name: 'Speed',
        data: [80],
        dataLabels: {
          format: `<div style="text-align:center"><span style="font-size:25px;color:${
            (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'  }">{y}</span><br/>` +
            `<span style="font-size:12px;color:silver">%</span></div>`,
        },
        tooltip: {
          valueSuffix: ' %',
        },
      }],
    };

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={gaugeOptions}
        />
      </div>
    );
  }
}
