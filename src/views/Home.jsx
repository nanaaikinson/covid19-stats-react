import React, { Component } from "react";
import Axios from "axios";
import { line as lineConfig } from "../config";
import LineChart from "../components/LineChart";
import DonutChart from "../components/DonutChart";
import CountUp from "react-countup";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      country: "Worldwide",
      title: "",
      theme: false,
      date: "",
      countries: [],
      total: { confirmed: 0, existing: 0, deaths: 0, recovered: 0 },
      chart: {
        line: {
          labels: [],
          datasets: [],
          options: {}
        },
        donut: {
          world: {
            options: {},
            series: []
          },
          country: {
            options: {},
            series: []
          }
        }
      },
      isCountry: false
    };
  }

  // Lifecycle Methods
  async componentDidMount() {
    const dataUrl = "https://pomber.github.io/covid19/timeseries.json";
    //const clientUrl = "https://ip-api.com/json";
    //const clientResponse = await Axios.get(clientUrl);
    const dataResponse = await Axios.get(dataUrl);
    //const clientData = clientResponse.data;
    const data = dataResponse.data;
    const countries = [];
    let date = "";

    for (const key of Object.keys(data)) {
      countries.push(key);
      date = data[key][data[key].length - 1].date;
    }

    // Set state
    this.setState({ data, countries, date });
    this.worldData();

    // Set data
    // if ("country" in clientData) {
    //   this.countryData(clientData.country);
    // } else {
    //   this.worldData();
    // }
  }

  // Component Methods
  getData = () => {
    const value = this.state.val;
    if (value === "Worldwide") {
      this.worldData();
    } else {
      this.countryData(value);
    }
  };

  // Country
  countryData = country => {
    const { data } = this.state;
    const confirmed = [];
    const recovered = [];
    const deaths = [];
    const labels = [];
    const existing = [];
    let line = Object.assign({}, lineConfig);
    let donut = {
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

    // Set confirmed, recovered, deaths
    data[country].forEach(record => {
      const c = record.confirmed ? record.confirmed : 0;
      const r = record.recovered ? record.recovered : 0;
      const d = record.deaths ? record.deaths : 0;
      const e = c && r && d ? c - (r + d) : 0;

      confirmed.push(c);
      recovered.push(r);
      deaths.push(d);
      existing.push(e);
      labels.push(record.date);
    });

    const c = Math.max(...confirmed);
    const r = Math.max(...recovered);
    const d = Math.max(...deaths);
    const e = c - (r + d);

    // Line
    line.labels = labels;
    line.datasets[0].data = confirmed;
    line.datasets[1].data = recovered;
    line.datasets[2].data = deaths;
    line.options = {};

    // Donut
    donut.options.labels = ["Confirmed", "Recovered", "Existing", "Deaths"];
    donut.series = [c, r, e, d];

    // Set state
    this.setState(prevState => {
      return {
        country: country,
        chart: { line, donut: { country: donut } },
        total: {
          ...prevState.total,
          confirmed: c,
          recovered: r,
          deaths: d,
          existing: e
        },
        title: country,
        isCountry: true
      };
    });
  };

  // World
  worldData = () => {
    const { data: world } = this.state;
    let line = Object.assign({}, lineConfig);
    let donut = {
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

    const data = [];
    const labels = [];
    const confirmed = [];
    const recovered = [];
    const deaths = [];
    const existing = [];
    const countries = [];

    // Set date values
    for (const country of Object.keys(world)) {
      world[country].forEach(record => {
        const c = record.confirmed;
        const r = record.recovered;
        const d = record.deaths;
        const e = c && r && d ? c - (r + d) : 0;

        // Set data for each day
        const dateIndex = data.findIndex(el => el.date === record.date);
        if (dateIndex !== -1) {
          data[dateIndex].confirmed += c;
          data[dateIndex].recovered += r;
          data[dateIndex].deaths += d;
          data[dateIndex].existing += e;
        } else {
          data.push({
            date: record.date,
            confirmed: c,
            deaths: d,
            recovered: r,
            existing: e
          });
        }
      });

      const i = world[country].length - 1;
      const last = world[country][i];

      countries.push({
        country,
        count: last.confirmed
      });
    }

    // Set total values
    const i = data.length - 1;
    const last = data[i];
    const total = {
      confirmed: last.confirmed,
      recovered: last.recovered,
      deaths: last.deaths,
      existing: last.existing
    };

    // Top confirmed
    const top = countries.sort((a, b) => b.count - a.count).splice(0, 5);
    const dSeries = [];
    const dLabels = [];
    for (const c of top) {
      dLabels.push(c.country);
      dSeries.push(c.count);
    }

    donut.options.labels = dLabels;
    donut.series = dSeries;

    // Set chart values
    data.forEach(el => {
      confirmed.push(el.confirmed);
      recovered.push(el.recovered);
      deaths.push(el.deaths);
      existing.push(el.existing);
      labels.push(el.date);
    });

    // Line
    line.labels = labels;
    line.datasets[0].data = confirmed;
    line.datasets[1].data = recovered;
    line.datasets[2].data = deaths;
    line.datasets[3].data = existing;
    line.options = {};

    // Set state
    this.setState({
      country: "Worldwide",
      total,
      chart: { line, donut: { world: Object.assign({}, donut) } },
      title: "Top 5 confirmed cases (countries)",
      isCountry: false
    });
  };

  // Handle select
  handleSelect = e => {
    const val = e.target.value;
    if (val === "Worldwide") {
      this.worldData();
    } else {
      this.countryData(val);
    }
  };

  // Set theme
  toggleTheme = e => {
    const { theme } = this.state;

    if (!theme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    this.setState({ theme: !theme });
  };

  render() {
    const {
      chart,
      total,
      country,
      countries,
      title,
      date,
      theme,
      isCountry
    } = this.state;

    return (
      <div className="container my-5">
        <div className="d-flex">
          <div className="custom-control custom-switch ml-auto">
            <input
              type="checkbox"
              className="custom-control-input"
              id="toggleSwitch"
              value={theme}
              onChange={this.toggleTheme}
            />
            <label className="custom-control-label" htmlFor="toggleSwitch">
              Dark
            </label>
          </div>
        </div>

        <div className="text-center mb-5">
          <h4>
            <strong>Coronavirus Statistics</strong>
          </h4>
          <h5>
            Data as at <strong>{date}</strong> 11:45PM GMT
          </h5>
        </div>

        <div className="row row-eq-height">
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-center mb-4">Filter by Country</h6>

                <div className="mb-5">
                  <select
                    name="country"
                    id="country"
                    className="custom-select"
                    value={country}
                    onChange={this.handleSelect}
                  >
                    <option value="Worldwide">Worldwide</option>
                    <option disabled>----------</option>
                    {countries.map(c => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Confirmed</th>
                          <th>Recovered</th>
                          <th>Deaths</th>
                          <th>Existing</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>
                            <strong>Total</strong>
                          </td>
                          <td>
                            <CountUp end={total.confirmed} />
                          </td>
                          <td>
                            <CountUp end={total.recovered} />
                          </td>
                          <td>
                            <CountUp end={total.deaths} />
                          </td>
                          <td>
                            <CountUp end={total.existing} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                {isCountry ? (
                  <DonutChart
                    data={chart.donut.country}
                    title={title}
                    id="donut-chart"
                  />
                ) : (
                  <DonutChart
                    data={chart.donut.world}
                    title={title}
                    id="donut-chart"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <LineChart data={chart.line} id="line-chart" />
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <hr />
          </div>

          <div className="col-md-8 offset-md-2">
            <p className="text-center">
              <i>
                {" "}
                Aggregated through{" "}
                <a
                  target="_blank"
                  href="https://github.com/pomber/covid19"
                  rel="noopener noreferrer"
                >
                  pomber/covid19
                </a>{" "}
                using data provided by{" "}
                <a href="https://github.com/CSSEGISandData/COVID-19">
                  2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by
                  Johns Hopkins CSSE
                </a>
              </i>
            </p>
          </div>

          <div className="col-md-12">
            <hr />
          </div>

          <div className="col-md-8 offset-md-2">
            <div></div>
            <p className="text-center">
              {/* <span>
              Inspired by{" "}
              <a
                target="_blank"
                href="https://github.com/thomas-alrek"
                rel="noopener noreferrer"
              >
                Thomas Alrek
              </a>
              </span> */}
              <span>
                Developed by{" "}
                <a href="https://github.com/nanaaikinson">
                  Nana Kwesi Ofosu-Aikins
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
