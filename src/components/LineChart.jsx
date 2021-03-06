import React from "react";
import { Line } from "react-chartjs-2";

function LineChart(props) {
  return <Line data={props.data} height={150} />;
}

export default LineChart;
