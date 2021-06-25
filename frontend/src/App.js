import React, { Component } from "react";

import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Doughnut from "./components/Doughnut";
import data from "./data";
import Chart from "chart.js";
import './App.css';

class App extends Component {

  state = {
    feeds: data(),
    accFeed: {
      time: [],
      value: []
    }
   };
  
  componentDidMount() {
    Chart.defaults.global.defaultFontColor = "#FFFFFF6F";
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
    // window.setInterval(() => {
    //   this.setState({
    //     feeds: data(),
    //   });
    // }, 5000);
    setInterval(() => {
      fetch('http://192.168.9.100:3005/api/user-activities')
      .then(response => response.json())
      .then(userActivitiesRes => {
        console.log("userActivitiesRes >>", userActivitiesRes);
        if(userActivitiesRes.status === 'fail') {
          return;
        }
        const accelerationDataSet = [];
        const timeDataSet = [];
        userActivitiesRes?.data?.forEach(activity => {
          accelerationDataSet.push(activity.acc);
          // timeDataSet.push(new Date(activity.created_at));
          timeDataSet.push(new Date(activity.created_at));
        });
        // console.log('accelerationDataSet >>>',accelerationDataSet)
        // console.log('timeDataSet >>>', timeDataSet)
        this.setState({
          accFeed: {
            time: timeDataSet,
            value: accelerationDataSet
          }
        });
      });
    }, 500)
  }
  
  render() {
    console.log(">>>", this.state.accFeed);
    return (
      <div className="app">
        <div className="title">
          <h1>Dashboard</h1>
          <p>
            You can see realtime data visulationation
            {/* <a href="https://www.createwithdata.com/react-chartjs-dashboard/">
              Create with Data
            </a> */}
          </p>
        </div>

        <div className="main chart-wrapper">
          <LineChart
            data={this.state.accFeed}
            title={'Acceleration of User movements'}
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
          {/* <div className="sub chart-wrapper doughnut">
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
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;
