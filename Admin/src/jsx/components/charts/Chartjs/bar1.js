import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.users;
    const usersByMonth = users.reduce((acc, user) => {
      const month = new Date(user.creationDate).getMonth();
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(user);
      return acc;
    }, {});
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"], // prettier-ignore
      datasets: [
        {
          label: "New Users",

          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

          borderColor: "rgba(64, 24, 157, 1)",
          borderWidth: "0",
          backgroundColor: "#EB8153",
        },
      ],
    };
    for (let month in usersByMonth)
      data.datasets[0].data[month] = usersByMonth[month].length;

    const options = {
      legend: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            // Change here
            barPercentage: 0.8,
          },
        ],
      },
    };

    return (
      <>
        <Bar data={data} height={50} options={options} />
      </>
    );
  }
}

export default BarChart1;
