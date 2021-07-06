import React, { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux';

import { Col, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import '../css/user_container.css';

import UserCard from '../components/UserCard';
import UserCreateContainer from './UserCreateContainer';

const UsersContainer = () => {
  const { userList } = useSelector((state) => {
    return {
      userList: state.main.userList,
    };
  }, shallowEqual);

  const [isAddUser, setIsAddUser] = useState(false);
  return (
    <div className="user-main-container">
      {!isAddUser ? <>
          <div className='add-btn-con'>
            <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsAddUser(true)} >
              Add
            </Button>
          </div>
          {
            userList.map((user, key) => {
              return  <Col key={key}>
                <UserCard user={user} />
            </Col>
            })
          }
        </>
      : <UserCreateContainer/> }
    </div>
  );
};

export default UsersContainer;
