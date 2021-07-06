import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import routes, {RenderRoutes} from '../../../route/Routes';
import {useHistory} from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {fetchUserList} from '../actions/MainActions';

import '../styles/main.css';
import DashboardContainer from '../../dashboard/containers/DashboardContainer';
import { MenuItemKeys } from '../MainConstants';
import { RoutePath } from '../../../route/Constant';

const { Header, Sider, Content } = Layout;

const MainContainer = () => {
  const history = useHistory();
  const { userList } = useSelector((state) => {
		return {
			userList: state.main.userList,
		};
	}, shallowEqual);
  
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => {
   setCollapsed(!collapsed);
  };

  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const onClickMenu = ({ item, key, keyPath, domEvent }) => {
    history.push(key);
  }

  return (
      <Layout>
          <Header style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
      </Header>
      <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[MenuItemKeys.DASHBOARD]} onClick={onClickMenu}>
                  <Menu.Item key={MenuItemKeys.DASHBOARD} icon={<UserOutlined />}>
                      Dashboard
                  </Menu.Item>
                  <Menu.Item key={MenuItemKeys.USERS} icon={<UserOutlined />}>
                      Users
                  </Menu.Item>
              </Menu>
          </Sider>
          {RenderRoutes(routes)}
      </Layout>
    </Layout>
  );
}

export default MainContainer;