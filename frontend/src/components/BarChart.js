import React, { Component, createRef } from "react";
import Chart from "chart.js";

class BarChart extends Component {
  constructor() {
    super();
    this.chartRef = createRef();
  }

  componentDidMount() {
    const { data, title, color } = this.props;
    const {time, value} = data;
    this.myChart = new Chart(this.chartRef.current, {
      type: "bar",
      options: {
        legend:{
          labels:{
              // fontColor:'white'
          }
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines:{
                // color:'rgba(255,255,255, 0.1)'
              },
              ticks: {
                min: 0,
                // max: 100,
              },
            },
          ],
          xAxes:[
            {
              gridLines:{
                // color:'rgba(255,255,255, 0.1)'
              },
              type: 'time',
              time: {
                unit: 'second'
              },
            }
          ]
        },
      },
      data: {
        labels: time,
        datasets: [
          {
            label: title,
            data: value,
            backgroundColor: color,
          },
        ],
      },
    });
  }

  componentDidUpdate() {
    const { time, value } = this.props.data;
    this.myChart.data.labels = time;
    this.myChart.data.datasets[0].data = value;
    this.myChart.update();
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} width={window.innerWidth} />
      </div>
    );
  }
}

export default BarChart;
