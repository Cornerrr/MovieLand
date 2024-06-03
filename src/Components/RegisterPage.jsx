import React, { useState } from "react";
import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
import {useNavigate,Link} from "react-router-dom";
 
export default function RegisterPage(){
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const registerUser = () => {
        axios.post('http://127.0.0.1:8081/signup', {
            email: email,
            password: password,
        })
        .then(function (response) {
             console.log(response);
            navigate("/");
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    };
     
    
    
    return (
        <div>
          <h1><p class="text-info fs-2 text-center">Movie Register</p></h1>
          <div className='container h-100'>
            <div className='container-fluid h-custom'>
              <div className='row d-flex justify-content align-items-center h-100'>
                <div className='col-md-9 col-lg-6 col-xl-5'>
                </div>
                  <div className='App1'>
                    <Form className='loginForm'>
                      <Typography.Title >歡迎回來!</Typography.Title>
    
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter valid email",
                          },
                        ]}
                        label='Email'
                        name={'myEmail'}
                      >
                        <Input value={email} onChange = {(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                      </Form.Item>
    
                      <Form.Item rules={[
                        {
                          required: true,
                          message: "Please enter valid password",
                        },
                      ]}
                        label='Password'
                        name={'myPassword'}
                      >
                        <Input.Password value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                      </Form.Item>


                      <Button type='primary' htmlType='submit' block onClick={() => registerUser()}>Sign Up</Button>
    
                      <div className='register-link'>
                        <p>Login to your account <li><Link to="/login" className="link-danger">login</Link></li></p>
                      </div>
                    </Form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      );
}