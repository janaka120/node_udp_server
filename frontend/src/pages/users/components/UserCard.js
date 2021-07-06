import React from 'react'

import { Skeleton, Card, Avatar, Tag, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined,} from '@ant-design/icons';
import moment from 'moment';
import { USER_STATES } from '../UserConstants';
import '../css/user_container.css';

import USER_001 from '../../../assets/users/user_1.png';
import USER_002 from '../../../assets/users/user_2.png';
import USER_003 from '../../../assets/users/user_3.png';

const { Text } = Typography;

const UserCard = ({user}) => {
    return (
        <Card
            hoverable
            className='user-card-con'
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
            >
            <Skeleton loading={false} avatar active>
                <div className='user-card-wrapper'>
                <Avatar shape="square" size={64} src={user.userId === 'USER_001' ? USER_001 : user.userId === 'USER_002' ? USER_002 : USER_003 }/>
                <div className='user-card-content'>
                    <div className='user-card-content-wrapper'>
                    <div className='user-card-content-col-1'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'User ID:'}</Text>
                        </div>
                        <Text type="secondary">{user.userId}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'First Name:'}</Text>
                        </div>
                        <Text type="secondary">{user.firstName}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'Last Name:'}</Text>
                        </div>
                        <Text type="secondary">{user.lastName}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'Registered Date:'}</Text>
                        </div>
                        <Text type="secondary">{moment(user.created_at).format('YYYY-MM-DD')}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'Device Id:'}</Text>
                        </div>
                        <Text type="secondary">{user.deviceId}</Text>
                    </div>
                    </div>
                    <div className='user-card-content-wrapper'>
                    <div className='user-card-content-col-1'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'Address:'}</Text>
                        </div>
                        <Text type="secondary">{`${user.address1}, ${user.address2}, ${user.address3}`}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'City:'}</Text>
                        </div>
                        <Text type="secondary">{user.city}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'PostalCode:'}</Text>
                        </div>
                        <Text type="secondary">{user.postalCode}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'Province:'}</Text>
                        </div>
                        <Text type="secondary">{user.province}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'Country:'}</Text>
                        </div>
                        <Text type="secondary">{'Sri Lanka'}</Text>
                    </div>
                    </div>
                    <div className='user-card-content-wrapper'>
                    <div className='user-card-content-col-1'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'Email:'}</Text>
                        </div>
                        <Text type="secondary">{user.email}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'DOB:'}</Text>
                        </div>
                        <Text type="secondary">{user.dob}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'Gender:'}</Text>
                        </div>
                        <Text type="secondary">{user.gender}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'NIC:'}</Text>
                        </div>
                        <Text type="secondary">{user.nic}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                            <Text>{'Phone:'}</Text>
                        </div>
                        <Text type="secondary">{user.phone}</Text>
                    </div>
                    </div>
                </div>
                </div>
                <div className='user-card-content-bottom'>
                <div style={{width: 62}}/>
                <div className='user-card-content-bottom-con'>
                    <Text className='user-card-content-col-1-title' strong>Caretaker Details</Text>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className='user-card-content-col-1'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'First Name:'}</Text>
                        </div>
                        <Text type="secondary">{user.careTakerFirstName}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'Last Name:'}</Text>
                        </div>
                        <Text type="secondary">{user.careTakerLastName}</Text>
                    </div>
                    <div className='user-card-content-col-1-content'>
                        <div className='user-card-content-col-1-title'>
                        <Text>{'Phone:'}</Text>
                        </div>
                        <Text type="secondary">{user.careTakerPhone}</Text>
                    </div>
                    <div className='user-card-content-col-1-content' />
                    <div className='user-card-content-col-1-content' />
                    </div>
                    <div className='user-card-content-state-con'>
                    <>
                    <Text className='user-card-content-col-1-title' strong>{`User state:`}</Text>
                    {user.state === USER_STATES.active ? <Tag icon={<CheckCircleOutlined />} color="success">
                        {USER_STATES.active}
                    </Tag> : user.state === USER_STATES.pending ? <Tag icon={<SyncOutlined spin />} color="processing">
                        {USER_STATES.pending}
                    </Tag> :  <Tag icon={<CloseCircleOutlined />} color="error">
                        {USER_STATES.hold}
                    </Tag>}
                    </>
                    </div>
                </div>
                </div>
            </Skeleton>
        </Card>
    );
}

export default UserCard;