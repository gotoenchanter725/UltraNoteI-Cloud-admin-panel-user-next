import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class TotalUsers extends Component {
  render() {
    const data = {
      datasets: [
        {
          data: [
            this.props.activeUsers,
            this.props.suspendedUsers,
            this.props.notActiveUsers,
          ],
          borderWidth: 1,

          backgroundColor: ["#7099ED", "#B3CCFF", "#9DBDFF"],
          hoverBackgroundColor: ["#7099ED", "#B3CCFF", "#9DBDFF"],
        },
      ],
      labels: ["Active Users", "Suspended users", "Not Active Users"],
    };
    console.log(data);
    const options = {
      responsive: true,
      legend: false,
      maintainAspectRatio: false,
    };

    return (
      <div style={{ height: 100 }}>
        <Pie data={data} height={100} options={options} />
      </div>
    );
  }
}

export default TotalUsers;
