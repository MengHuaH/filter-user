import { useState, useEffect } from 'react';
import users from './data/demo';
import { cities } from './data/defaultData';
import { Card, Space, Table } from 'antd';
import { AdvancedSearchForm } from "./components/index";

export default function App() {

  const [address, setAddress] = useState([])
  const [fieldsValue, setFieldsValue] = useState({})
  const [dataSource, setDataSource] = useState(users)

  const ageOptions = [
    { label: '0-10', value: 0, min: 0, max: 10 },
    { label: '10-20', value: 1, min: 10, max: 20 },
    { label: '20-30', value: 2, min: 20, max: 30 },
    { label: '30-40', value: 3, min: 30, max: 40 },
    { label: '40-50', value: 4, min: 40, max: 50 },
    { label: '50-60', value: 5, min: 50, max: 60 },
    { label: '60-70', value: 6, min: 60, max: 70 },
    { label: '70-80', value: 7, min: 70, max: 80 },
    { label: '80-90', value: 8, min: 80, max: 90 },
    { label: '90-100', value: 9, min: 90, max: 100 }
  ];
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const fields = [
    {
      label: "年龄段",
      name: "age",
      type: "CheckboxAndTag",
      options: ageOptions,
      span: 3
    },
    {
      label: "地区",
      name: "address",
      type: "CheckboxAndTag",
      options: address,
      span: 3
    }
  ]

  const getAddress = () => {
    var address = [];
    cities.map((item, index) => address.push({ label: item, value: index }))
    setAddress(address)
  }

  const onFinish = values => {
    // const params = new URLSearchParams(values).toString();
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      params.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });
    history.replaceState({}, '', `?${params.toString()}`);
    fetchData(values)
  };

  const fetchData = (params) => {
    const thisUsers = users
    setDataSource(thisUsers)
    var ages = []
    var thisAddress = []
    if (Array.isArray(params.age) && params.age.length != 0) {
      params.age.map(item => {
        var minAge = ageOptions.find(a => a.value == item).min
        var maxAge = ageOptions.find(a => a.value == item).max
        for (let index = minAge; index <= maxAge; index++) {
          !ages.includes(index) && ages.push(index)
        }
      })
    }
    if (Array.isArray(params.address) && params.address.length != 0) {
      params.address.map(item => {
        thisAddress.push(address.find(a => a.value == item)?.label)
      })
    }
    const newDataSource = thisUsers.filter(item => {
      if ((ages.length == 0 || ages.includes(item.age)) && (thisAddress.length == 0 || thisAddress.includes(item.address))) {
        return item
      }
    })
    setDataSource(newDataSource)
  }


  useEffect(() => {
    getAddress()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = {};

    params.forEach((value, key) => {
      try {
        result[key] = JSON.parse(value); // 尝试解析JSON
      } catch (e) {
        result[key] = value; // 普通字符串
      }
    });
    setFieldsValue(result)
    fetchData(result)
  }, [address])

  return (
    <Space direction="vertical" style={{width: "100%"}}>
      <Card>
        <AdvancedSearchForm fields={fields} onFinish={value => onFinish(value)} fieldsValue={fieldsValue} />
      </Card>
      <Card>
        <Table dataSource={dataSource} columns={columns} rowKey={"id"} />
      </Card>
    </Space>
  );
}