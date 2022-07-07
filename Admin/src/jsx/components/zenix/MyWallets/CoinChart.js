import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "New Clients",
          data: [300, 450, 600, 600, 400, 450, 410, 470, 480, 700, 600, 800, 400, 600, 350, 250, 500, 550, 300, 400, 200],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 300,
          stacked: true,
          toolbar: {
            show: false,
          },
          sparkline: {
            //enabled: true
          },
          offsetX: -10,
        },
        plotOptions: {
          bar: {
            columnWidth: "28%",
            endingShape: "rounded",
            startingShape: "rounded",
            colors: {
              backgroundBarColors: ['#E9E9E9', '#E9E9E9', '#E9E9E9', '#E9E9E9','#E9E9E9','#E9E9E9','#E9E9E9','#E9E9E9','#E9E9E9','#E9E9E9','#E9E9E9','#E9E9E9'],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 5,
            },
          },
          distributed: true,
        },
        colors:['#B87EFF'],
        grid: {
          show: false,
        },
        legend: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          enabled: false,
          colors: ["#000"],
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 1,
          },
        },
        xaxis: {
           categories: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
          labels: {
            style: {
                colors: '#808080',
				fontSize: "13px",
				fontFamily: "poppins",
				fontWeight: 100,
				cssClass: "apexcharts-xaxis-label",
            },
          },
          crosshairs: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            style: {
               colors: '#808080',
				fontSize: "14px",
				fontFamily: "Poppins",
				fontWeight: 100,
            },
            formatter: function (y) {
              return y.toFixed(0) + "k";
            },
          },
        },
        tooltip: {
          x: {
            show: true,
          },
        },
        responsive: [
          {
            breakpoint: 575,
            options: {
              chart: {
                height: 250,
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return ( 
      <div id="chart" class="timeline-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={300}
        />
      </div>
    );
  }
}

export default PieChart;
