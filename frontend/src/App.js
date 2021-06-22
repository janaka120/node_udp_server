import React, { Component } from "react";

import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Doughnut from "./components/Doughnut";
import data from "./data";
import Chart from "chart.js";
import './App.css';

// var mongoose = require('mongoose');
// import * as mongoose from "mongoose";
import { connect, connection } from 'mongoose';

const {Todos} = require('./models/todos'); 


class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { feeds: data() };
    
    connect('mongodb://mongodb:27017/test', {useNewUrlParser: true});
    // this.db = mongoose.connection;
    // this.db = connection;
    // this.handleClick = this.handleClick.bind(this);
  }
  
  // state = { feeds: data() };
  
  componentDidMount() {
    Chart.defaults.global.defaultFontColor = "#FFFFFF6F";
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
    window.setInterval(() => {
      this.setState({
        feeds: data(),
      });
    }, 5000);
    
    // this.db.on('error', console.error.bind(console, 'CONNECTION ERROR FRONT END---'));
    // this.db.once('open', function() {
    //   // we're connected to DB
    //   console.log('Connected to MongoDB from Frontend---') 
    // });

    // const myData = new Todos({
    //   description: message,
    //   complete: true
    // });

    // Todos.find(function (err, todos) {
    //   if (err) return console.error("FRONTEND Error retrieve data from Todos schema --->>>", err);
    //   console.log('FRONTEND todos --- >>>', todos);
    // });
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
