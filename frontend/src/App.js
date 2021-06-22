import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Button } from 'react-bootstrap';

import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Doughnut from "./components/Doughnut";
import data from "./data";
import Chart from "chart.js";
import './App.css';

const client = new W3CWebSocket('ws://localhost:8126');

class App extends Component {
  state = { feeds: data() };

  componentDidMount() {
    Chart.defaults.global.defaultFontColor = "#FFFFFF6F";
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
    window.setInterval(() => {
      this.setState({
        feeds: data(),
      });
    }, 5000);

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer);
      if (dataFromServer.type === "message") {
        console.log('data from server >>>>', dataFromServer)
        // this.setState((state) =>
        //   ({
        //     messages: [...state.messages,
        //     {
        //       msg: dataFromServer.msg,
        //       user: dataFromServer.user
        //     }]
        //   })
        // );
      }
    };
  }

  onButtonClicked = (value) => {
    client.send(JSON.stringify({
      type: "message",
      msg: value,
      user: 'front-end client 1'
    }));
  }

  render() {
    return (
      <div className="app">
        <div className="title">
          <h1>React Dashboard Demo</h1>
          <p>
            Built with React.js and Chart.js based on a project by{" "}
            <a href="https://www.createwithdata.com/react-chartjs-dashboard/">
              Create with Data
            </a>
          </p>
        <Button variant="primary" onClick={() => this.onButtonClicked('234.23, 45.343, 454.11, 343.11, 665.45, 632.89')}>Primary</Button>{' '}
        </div>

        <div className="main chart-wrapper">
          <LineChart
            data={this.state.feeds[0].data}
            title={this.state.feeds[0].title}
            color="#ffa600"
          />
        </div>
        <div className="sub-wrapper">
          <div className="sub chart-wrapper">
            <BarChart
              data={this.state.feeds[1].data}
              title={this.state.feeds[1].title}
              color="#955196"
            />
          </div>

          <div className="sub chart-wrapper">
            <BarChart
              data={this.state.feeds[3].data}
              title={this.state.feeds[3].title}
              color="#ff6e54"
            />
          </div>
          <div className="sub chart-wrapper doughnut">
            <Doughnut
              data={this.state.feeds[2].data}
              title={this.state.feeds[2].title}
              colors={[
                "#003f5c",
                "#444e86",
                "#955196",
                "#dd5182",
                "#ff6e54",
                "#ffa600",
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
