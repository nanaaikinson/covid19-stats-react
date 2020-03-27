import React from "react";
import Chart from "react-apexcharts";

function DonutChart({ data, title }) {
  return (
    <div>
      <h6 className="text-center mb-4">{title}</h6>
      <Chart
        options={data.options}
        series={data.series}
        type="donut"
        width="100%"
        height="350"
      />
    </div>
  );
}

export default DonutChart;
