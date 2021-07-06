import React from 'react'
import { Form, Input, Button, Select, Divider, Space } from 'antd';
import '../css/user_create_container.css';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const UserCreateContainer = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Divider>Personal Information</Divider>
      <div className='main-row-con'>
        <div className='main-row-col-con'>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con'>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con'>
          <Form.Item
            name="deviceId"
            label="Device"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a Device ID"
              allowClear
              options={DeviceList}
            />
          </Form.Item>
        </div>
      </div>
      <div className='main-row-con'>
        <div className='main-row-col-con' >
          <Form.Item
            name="address1"
            label="Address 1"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="address2"
            label="Address 2"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="address3"
            label="Address 3"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className='main-row-con'>
        <div className='main-row-col-con' >
          <Form.Item
            name="postalCode"
            label="Postal code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="note"
            label="Province"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
                placeholder="Select a Province"
                allowClear
                options={ProvinceList}
              />
          </Form.Item>
        </div>
      </div>
      <div className='main-row-con'>
        <div className='main-row-col-con' >
          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
                placeholder="Select a Country"
                allowClear
                options={CountryList}
              />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className='main-row-con'>
        <div className='main-row-col-con' >
          <Form.Item
            placeholder="YYYY-MM-DD"
            name="dob"
            label="DOB"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a Gender"
              allowClear
              options={GenderList}
            />
          </Form.Item>
        </div>
        <div className='main-row-col-con' >
          <Form.Item
            name="nic"
            label="NIC"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <Divider>Caretaker Information</Divider>
      <div className='main-row-con'>
        <div className='main-row-col-con'>
          <Form.Item
            name="careTakerFirstName"
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con'>
          <Form.Item
            name="careTakerLastName"
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='main-row-col-con'>
          <Form.Item
            name="careTakerPhone"
            label="Phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className='bottom-con'>
        <di className="bottom-con-left">
          <Button htmlType="button" onClick={onFill}>
            Cancel
          </Button>
        </di>
        <div className='bottom-con-right'>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </div>
      </div>
    </Form>
  );
  };
  
  export default UserCreateContainer;
  

  const DeviceList = [{label: 'DEVICE 1', value: "DEVICE_001"}, {label: 'DEVICE 2', value: "DEVICE_002"}, {label: 'DEVICE 3', value: "DEVICE_003"}]
  
  const ProvinceList = [
    {label: 'Western', value: "Western"},
    {label: 'Southern', value: "Southern"},
    {label: 'Central', value: "Central"},
    {label: 'Eastern', value: "Eastern"},
    {label: 'Northern', value: "Northern"},
  ];
  
  const CountryList = [
    {label: 'Sri Lanka', value: "Sri Lanka"},
  ];

  const GenderList = [
    {label: 'Male', value: "Male"},
    {label: 'Female', value: "Female"},
  ];