import React, { Component } from 'react'

import { Col, Row, Typography, DatePicker, Radio, Space} from 'antd';
import moment from 'moment';

import BarChart from "../../../components/BarChart";
import LineChart from "../../../components/LineChart";
import Doughnut from "../../../components/Doughnut";
import data from "../../../data";
import Chart from "chart.js";

import '../styles/dashboard.css';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const BACKEND_DATE_FORMATE = 'YYYY-MM-DDTHH:mm:ss';

const chartOptions = [
    { label: 'Line chart', value: 'line' },
    { label: 'Bar chart', value: 'bar' },
  ];

export default class FilterAllowChart extends Component {
    state = {
        dateRange: [moment().subtract(2, 'd'), moment()],
        feeds: data(),
        accFeed: {
            time: [],
            value: []
        },
        angularFeed: {
            time: [],
            value: []
        },
        selectedChart: 'line',
    };

    tempDateRange = null;

    componentDidMount() {
        Chart.defaults.global.defaultFontColor = "#000";
        Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

        this.fetchDataUserActivities({
            fromDate: this.state.dateRange[0],
            toDate: this.state.dateRange[1],
        });
    }

    onChangeDates = (dates, dateStrings) => {
		this.tempDateRange = dates;
    };
    
    onCalendarToggle = (open) => {
		if (open) {
			this.tempDateRange = null;
		} else if (!open && this.tempDateRange) {
            const [newFrom, newTo] = this.tempDateRange;
            this.setState({dateRange: [newFrom, newTo]});
            this.fetchDataUserActivities({
                fromDate: newFrom,
                toDate: newTo, 
            });
		}
    };
    
    fetchDataUserActivities = (filterParams) => {
        const {fromDate, toDate} = filterParams;
        const fromD = fromDate.format(BACKEND_DATE_FORMATE)
        const toD = toDate.format(BACKEND_DATE_FORMATE)
        fetch(`http://192.168.9.100:3005/api/user-activities?fromDate=${fromD}&toDate=${toD}`)
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
    }

    onChange4 = e => {
        this.setState({
            selectedChart: e.target.value,
        });
    };

    render() {
        return (
            <div>
                 <Row>
                    <Col span={12}>
                        <Title level={4}>Records of user behavior</Title>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Space>
                                <Radio.Group
                                    options={chartOptions}
                                    onChange={this.onChange4}
                                    value={this.state.selectedChart}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                                <RangePicker
                                    showTime
                                    value={this.state.dateRange}
                                    onCalendarChange={this.onChangeDates}
                                    onOpenChange={this.onCalendarToggle} />
                            </Space>
                        </Row>
                    </Col>
                </Row> 
                <div className='main-chart-wrapper'>
                    <Paragraph>
                        Acceleration vector behavior
                    </Paragraph>
                    <div className="chart-wrapper">
                        {this.state.selectedChart === 'line' ? <LineChart
                            data={this.state.accFeed}
                            title={'Acceleration of User'}
                            color="#ffa600"
                        /> : 
                        <BarChart
                            data={this.state.accFeed}
                            title={'Acceleration of User'}
                            color="#ffa600"
                        />
                        }
                    </div>
                </div>
                <div className='main-chart-wrapper'>
                    <p>
                        Angular velocity behavior
                    </p>
                    <div className="chart-wrapper">
                        {this.state.selectedChart === 'line' ? <LineChart
                            data={this.state.angularFeed}
                            title={'Angular velocity of User'}
                            color="#9370d8"
                        /> : 
                        <BarChart
                            data={this.state.angularFeed}
                            title={'Angular velocity of User'}
                            color="#955196"
                        />
                        }
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
