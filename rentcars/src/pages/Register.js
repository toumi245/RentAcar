import React from 'react'
import { Link } from 'react-router-dom'
import {Form,Input} from "antd"
import { useDispatch } from 'react-redux'
import { userRegister } from '../redux/actions/userActions'
import DefaultLayout from '../components/DefaultLayout'
function Register() {
  function onFinish(values) {
    dispatch(userRegister(values))
    console.log(values)
  }
  const dispatch=useDispatch()
  return (
    <DefaultLayout>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <Form layout='vertical' onFinish={onFinish}>
      <Form.Item name="username" label="username" rules={[{required:true}]}>
        <Input style={{width:'500px'}}/>
      </Form.Item>
      <Form.Item name="password" label="password" rules={[{required:true}]}>
        <Input/>
      </Form.Item>
      <Form.Item name=" Confirm password" label="Confirm password" rules={[{required:true}]}>
        <Input/>
      </Form.Item>
      <button style={{display:"flex",justifyContent:'center'}} >Login</button>
      <Link to={"/login"}>click here to login</Link>

    </Form>
    </div>
    </DefaultLayout>
  )
}

export default Register
