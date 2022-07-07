import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [34, 12, 41, 22],
      options: {
        chart: {
          type: "donut",
          width: 300,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 0,
        },
        colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3'],
        legend: {
          position: "bottom",
          show: false,
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={200}
          width={200}
        />
      </div>
    );
  }
}

export default PieChart;
