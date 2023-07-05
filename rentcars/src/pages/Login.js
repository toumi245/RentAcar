import React from 'react'
import {Form,Input} from "antd"
import { useDispatch } from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import { Link } from 'react-router-dom'
function Login() {
    const dispatch=useDispatch()
    function onFinish(values) {
      dispatch(userLogin(values))
    }
  return (
    <div className='login'>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item name="username" label="username" rules={[{required:true}]}>
            <Input style={{width:'500px'}}/>
          </Form.Item>
          {/* <Form.Item name="email" label="email" rules={[{required:true}]}>
            <Input style={{width:'500px'}}/>
          </Form.Item> */}
          <Form.Item name="password" label="password" rules={[{required:true}]}>
            <Input/>
          </Form.Item>
          <button style={{display:"flex",justifyContent:'center'}} >Login</button>
          <Link to={"/register"}>click here to register</Link>
        </Form>
        
        </div>
  
    </div>
  )
}

export default Login
