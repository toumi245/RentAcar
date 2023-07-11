import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row, DatePicker} from 'antd'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';

const { RangePicker } = DatePicker;

function AdminHome() {

  const {cars}=useSelector(state=>state.carsReducer)
  const {loading}=useSelector(state=>state.alertsReducer)
  const [totalCars,setTotalcars]=useState([])
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllCars())
  },[])

useEffect(()=>{
  setTotalcars(cars)
},[cars])

  return (
    <DefaultLayout>
    
      {loading == true && (<Spinner/>)}
    <Row justify='center' gutter={16} >
    {totalCars.map(car=>{
    return <Col lg={5} sm={24} xs={24}>
    <div  className="car p-2 bs1 ">
    <img src={car.image} className="carimg"/>
    <div className="car-content d-flex align-items-center justify-content-between">
    <div className='text-left pl-2'>
      <p style={{fontWeight:"bold"}}> {car.name}</p>
      <p> {car.rentPerHour}-</p>
    </div>
    <div className='mr-4'>
    <EditOutlined className='mr-3'style={{color:'green',cursor:'pointer'}}/>
    <DeleteOutlined style={{color:'red',cursor:'pointer'}}/>
    </div>
    </div>
    </div>
    </Col>
    })}
    </Row>
    </DefaultLayout>
  )
}

export default AdminHome
