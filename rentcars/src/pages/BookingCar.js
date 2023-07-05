import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { Col, Row,Divider, Checkbox , DatePicker,Modal} from 'antd'
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions'
import StripeCheckout from 'react-stripe-checkout';

const { RangePicker } = DatePicker;

function BookingCar() {
const {carid}=useParams()
const {cars}=useSelector(state=>state.carsReducer)
const {loading}=useSelector(state=>state.alertsReducer)
const [car,setCar]=useState({})
const dispatch=useDispatch()
const [from,setFrom]=useState({})
const [to,setTo]=useState({})
const [totalHours,setTotalHours]=useState(0)
const [driver,setDriver]=useState(false)
const [totalAmount,setTotalAmount]=useState(0)
const [showModal,setShowModal]=useState(false)
useEffect(()=>{
  if(cars.length==0)
  {
    dispatch(getAllCars())
  }
else {
      setCar(cars.find(o=>o._id==carid))
}
},[cars])
function SelectTimeSlots(value) {
  if (value && value.length === 2) {
    const fromTime = moment(value[0]).format('YYYY-MM-DD HH:mm');
    const toTime = moment(value[1]).format('YYYY-MM-DD HH:mm');
    setFrom(fromTime);
    setTo(toTime);
    setTotalHours(moment(value[1]).diff(value[0], 'hours'));
  }
}



useEffect(()=>{
  setTotalAmount((totalHours* parseInt(car.rentPerHour)))
  if (driver)
  {
    setTotalAmount(totalAmount+(30 * totalHours))
  }
},[driver,totalHours])

function bookNow(){
  
}
function onToken(token){
  const reqObj={
    token,
    user:JSON.parse(localStorage.getItem('user'))._id,
    car:car._id,
    totalHours,
    totalAmount,
    driverRequire:driver,
    bookedTimeSlots:{
      from,
      to  }
  }
  dispatch(bookCar(reqObj))
}
  return (
  <DefaultLayout>
    {loading && (<Spinner/>) }
    <Row justify="center" className='d-flex align-items-center' style={{minHeight:"90vh"}}>
      <Col lg={10} sm={24} xs={24}>
        <img src={car.image} alt='dacia' className='carimg2 bs1'/>
      </Col>
      <Col lg={10} sm={24} xs={24}>
        <Divider type='horizontal' dashed>Car Info</Divider>
      <div style={{textAlign:"right"}}>
        <p>{car.name}</p>
        <p>{car.rentPerHour}</p>
        <p>fuel:{car.fuelType}</p>
        <p>Max Persons:{car.capacity}</p>
      </div>
      
        <Divider type='horizontal' dashed>Select Time Slots</Divider>
        <RangePicker
  showTime={{
    format: 'HH:mm',
    defaultValue: [moment(), moment().add(1, 'hour')]
  }}
  format='YYYY-MM-DD HH:mm'
  onChange={(value) => SelectTimeSlots(value)}
/>
          <br/>
          <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}>see booked time slots</button>
          <div>
          <p>Total Hours: {totalHours}</p>
          <p>Rent Per Hour : {car.rentPerHour}</p>
          <Checkbox onChange={(e)=>{
            if(e.target.checked){
              setDriver(true)
            }else{
              setDriver(false)
            }
          }}>driver Required</Checkbox>
          <h3>TotalAmount : {totalAmount}</h3>
          <StripeCheckout
          shippingAddress
        token={onToken}
        currency='inr'
        amount={totalAmount * 100}
        stripeKey="pk_test_51NQZodLucVp5DJybkS5kUh6A6NfsL49wFbrf15qc89q6hAfZUClEWTmXygkgPW9iSyjfnuWnP9ouBz7u6L6nKzkc00VPMMyc6H"
      ><button className='btn1' >Book Now</button></StripeCheckout>
        
        </div>
      </Col>
    </Row>
    <Modal closable={false} footer={false} title='Booked Time Slots' visible={showModal} onCancel={() => setShowModal(false)}>
        {car && car.bookedTimeSlots && (<div className='p-2'>{car.bookedTimeSlots.map((slot, index) => (
          <button className='btn1 mt-2' key={index}>{slot.from} - {slot.to}</button>
        ))}
        <div className='text-right mt-5'>
          <button className='btn1' onClick={()=>{setShowModal(false)}}>close</button>
        </div>
        </div>)}
      </Modal>

  </DefaultLayout>
  )
}

export default BookingCar
