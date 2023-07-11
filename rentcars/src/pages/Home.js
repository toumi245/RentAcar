import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row, DatePicker} from 'antd'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment'
const { RangePicker } = DatePicker;

function Home() {

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
function setFilter(values){
var selectedFrom=moment(values[0]).format("YYYY-MM-DD HH:mm")
var selectedTo=moment(values[1]).format("YYYY-MM-DD HH:mm")
var temp=[]
for(var car of totalCars){
  if (car.bookedTimeSlots.length==0){
    temp.push(car)
  }
  else{
    for (var booking of car.bookedTimeSlots){
      if(selectedFrom.isBetween(booking.from , booking.to) ||
      selectedTo.isBetween(booking.from ,booking.to)||
      moment(booking.from).isBetween(selectedFrom,selectedTo)||
      moment(booking.to).isBetween(selectedFrom,selectedTo)
      )
      {

      }
      else{
        temp.push(car)
      }
    }
  }
}
setTotalcars(temp)
}
  return (
    <DefaultLayout>
      <Row className='mt-3' justify="center">
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker onChange={setFilter}  />
        </Col>
      </Row>
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
    <div>
      <button className="btn1 mr-2" ><Link to={`/booking/${car._id}`}>Book Now</Link></button>
    </div>
    </div>
    </div>
    </Col>
    })}
    </Row>
    </DefaultLayout>
  )
}

export default Home
