import React from "react";
import ReactApexChart from "react-apexcharts";

class CurrentChart extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
          
            series: [85, 60, 67, 50],
            options: {
				chart: {
					height: 350,
					type: 'radialBar',
				},
				plotOptions: {
					radialBar: {
						startAngle:-90,
						endAngle: 90,
						dataLabels: {
							name: {
								fontSize: '22px',
							},
							value: {
								fontSize: '16px',
							},
						}
					},
				},
				stroke:{
					lineCap: 'round',
				},
				labels: ['Income', 'Income', 'Imcome', 'Income'],
				colors:['#ec8153', '#70b944','#498bd9','#6647bf'],
            },
          
        };
    }

	render() {
		return (
			<div id="chart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="radialBar"
				  height={320}
				/>
			</div>
		);
	}
}

export default CurrentChart;
