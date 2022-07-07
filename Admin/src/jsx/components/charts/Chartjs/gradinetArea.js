import React, { Component } from "react";
import { Line } from "react-chartjs-2";


class GradientArea extends Component {
  
  render() {
 
   const data = {
    defaultFontFamily: "Poppins",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","dec"],
    datasets: [
      {
        label: "Total Deposits ",
        data: [ 374000/12 , 374000/8, 374000/5, 374000/7, 374000/3, 374000/6, 374000/2, 374000/4, 374000/7, 374000/9, 374000/4, 374000/1],
        borderColor: "#8a8af7",
        borderWidth: "1",
        backgroundColor: "rgba(39, 217, 245, 0.4)",
      },
    ],
  };
  
  const options = {
    legend: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 500000,
            min: 0,
            stepSize: 20,
            padding: 5,
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
    return (
      <>
     
        <Line data={data} options={options} height={150} />
      </>
    );
  }
}

export default GradientArea;
