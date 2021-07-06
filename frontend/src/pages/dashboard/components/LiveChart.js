import React, { Component } from 'react'

import BarChart from "../../../components/BarChart";
import LineChart from "../../../components/LineChart";
import Doughnut from "../../../components/Doughnut";
import data from "../../../data";
import Chart from "chart.js";
import { Typography } from 'antd';

import '../styles/dashboard.css';

const { Title, Paragraph } = Typography;

export default class LiveChart extends Component {
    state = {
        feeds: data(),
        accFeed: {
            time: [],
            value: []
        },
        angularFeed: {
            time: [],
            value: []
        }
    };

    componentDidMount() {
        Chart.defaults.global.defaultFontColor = "#000";
        Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

        this.myInterval = setInterval(() => {
          fetch('http://192.168.9.100:3005/api/user-activities-latest')
          .then(response => response.json())
          .then(userActivitiesRes => {
            console.log("userActivitiesRes >>", userActivitiesRes);
            if(userActivitiesRes.status === 'fail') {
              return;
            }
            const accelerationDataSet = [];
            const timeDataSet = [];
            const angularDataSet = [];
            userActivitiesRes?.data?.forEach(activity => {
              accelerationDataSet.push(activity.acc);
              angularDataSet.push(activity.w);
              timeDataSet.push(new Date(activity.created_at));
            });

            this.setState({
              accFeed: {
                time: timeDataSet,
                value: accelerationDataSet
              },
              angularFeed: {
                  time: timeDataSet,
                  value: angularDataSet
              }
            });
          });
        }, 500)
    }

    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    render() {
        return (
            <div> 
                <Title level={4}>Live records of user behavior with in last hour</Title>
                <div className='main-chart-wrapper'>
                    <Paragraph>
                        Acceleration vector behavior
                    </Paragraph>
                    <div className="chart-wrapper">
                        <LineChart
                            data={this.state.accFeed}
                            title={'Acceleration of User'}
                            color="#ffa600"
                        />
                    </div>
                </div>
                <div className='main-chart-wrapper'>
                    <p>
                        Angular velocity behavior
                    </p>
                    <div className="chart-wrapper">
                        <LineChart
                            data={this.state.angularFeed}
                            title={'Angular velocity of User'}
                            color="#9370d8"
                        />
                    </div>
                </div>
                    {/* <div className="sub-wrapper">
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
                    </div> */}
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
                    {/* </div> */}
            </div>
        )
    }
}
