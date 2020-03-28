export const line = {
  labels: [],
  datasets: [
    {
      label: "Confirmed",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(0, 143, 251, 0.4)",
      borderColor: "rgba(0, 143, 251, 1)",
      borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(0, 143, 251, 1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(0, 143, 251, 1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: []
    },
    {
      label: "Recovered",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(0, 227, 150, 0.4)",
      borderColor: "rgba(0, 227, 150, 1)",
      borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(0, 227, 150, 1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(0, 227, 150, 1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: []
    },
    {
      label: "Deaths",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(255, 69, 96, 0.4)",
      borderColor: "rgba(255, 69, 96, 1)",
      borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(255, 69, 96, 1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(255, 69, 96, 1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: []
    },
    {
      label: "Existing",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(254, 176, 25, 0.4)",
      borderColor: "rgba(254, 176, 25, 1)",
      borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(254, 176, 25, 1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(254, 176, 25, 1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: []
    }
  ]
};

export const donut = {
  options: {
    labels: [],
    legend: {
      show: true,
      position: "bottom"
    },
    dataLabels: {
      formatter: function(val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      }
    }
  },
  series: []
};
