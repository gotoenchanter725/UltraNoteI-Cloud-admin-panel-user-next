import React from "react";
import ReactApexChart from "react-apexcharts";

class ChartBarRunning3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "series1",
          data: [300, 200, 200, 300, 400, 600, 450, 200, 300,600]
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        colors:['#ff782c'],
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        grid:{
			borderColor: '#EEEEEE',
		},
        yaxis: {
			labels: {
				 formatter: function (value) {
				  return value + "k";
				},
				style: {
					colors: '#787878',
					fontSize: '13px',
					fontFamily: 'Poppins',
					fontWeight: 400
				},
			},
        },
        xaxis: {
          type: 'Week',
          categories: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05", "Week 06", "Week 07","Week 08","Week 09","Week 010"],
		  labels:{
			    show: true,
				style:{
					 colors:'#808080',
				},
		   },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}

export default ChartBarRunning3;
