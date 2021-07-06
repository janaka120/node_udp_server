import React, { useState } from 'react'
import { Select, Tabs } from 'antd';
import LiveChart from '../components/LiveChart';
import FilterAllowChart from '../components/FilterAllowChart';


const { TabPane } = Tabs;
const { Option } = Select;


const DashboardContainer = () => {
    const [selectedTab, setSelectedTab] = useState("1")
    const callback = (key) => {
        console.log(key);
        setSelectedTab(key);
    }

    const onChange = (value) => {
        console.log(`selected ${value}`);
    }
      
    const onBlur = () => {
        console.log('blur');
    }
      
    const onFocus = () => {
        console.log('focus');
    }
      
    const onSearch = (val)=>  {
        console.log('search:', val);
    }

    const operations =  <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
    >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
    </Select>;

    return (
        <Tabs onChange={callback} type="card" tabBarExtraContent={operations}>
            <TabPane tab="Live" key="1">
                {selectedTab === "1" ? <LiveChart /> : null}
            </TabPane>
            <TabPane tab="All" key="2">
                {selectedTab === "2" ? <FilterAllowChart /> : null}
            </TabPane>
            <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    );
};

export default DashboardContainer;
