import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class DualLineDeposit extends Component {
  
  render() {
    console.log(this.props);
    const { amountdata  } = this.props; 
    const graphdata =  amountdata.toString();
    console.log(graphdata);
    const graphdatamod = graphdata.slice(0, 6);
    const graphdatamodint =  parseInt(graphdatamod);
    console.log(graphdatamodint);
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          label: "Deposit",
          data: [ graphdatamodint/12 , graphdatamodint/8, graphdatamodint/5, graphdatamodint/7, graphdatamodint/3, graphdatamodint/6, graphdatamodint/2, graphdatamodint/4, graphdatamodint/7, graphdatamodint/9, graphdatamodint/4, graphdatamodint/1],
          stepSize: 20,
          borderWidth: "3",
          backgroundColor: "transparent",
          pointBackgroundColor: "#4bc091",
          borderColor: '#4bc091',
          
        },

      ],
    };
    
    const options = {
      legend: false,
      tooltips: {
        intersect: false,
      },
      hover: {
        // mode: "nearest",
        intersect: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 500000,
              min: 0,
              stepSize: 50000,
              padding: 10,
              Color:"#ffebee"
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              padding: 5,
            },
          },
        ],
      },
    };
    return <Line data={data} options={options} height={150} />;
  }
}

export default DualLineDeposit;


