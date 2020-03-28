import React from "react";
import { Line } from "react-chartjs-2";

function LineChart(props) {
  console.log({ ...props.data.labels, ...props.data.datasets });
  return <Line data={props.data} options={props.options} height={150} />;
}

export default LineChart;
