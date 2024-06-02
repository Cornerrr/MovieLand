import React , {useState, useEffect ,useContext} from 'react';
import { Button, Divider, Form, Input, Typography, message } from 'antd';
import { FacebookFilled, GoogleOutlined, TwitterOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const LoginForm = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


  const navigate = useNavigate();

  const logInUser = () => {
    if(email.length === 0){
      alert("Email has left Blank!");
    }
    else if(password.length === 0){
      alert("password has left Blank!");
    }
    else{
      axios.post('http://127.0.0.1:8081/login', {
        email: email,
        password: password
      })
      .then(function (response) {
        message.success('Login Successful!')
        console.log(response);
        //console.log(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error, 'error');
        if(error.response.status === 401){
          alert("Invalid credentials");
        }
      });
    }
  }

  const login = () => {
    message.success('Login Successful!')
  }

  return (
    <div>
      <h1><p class="text-info fs-2 text-center">Movie Login</p></h1>
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

                  <div className='remember-forgot'>
                    <label><input type="checkbox" />Remember me</label>
                    <a herf="#">Forgot password?</a>
                  </div>

                  <Button type='primary' htmlType='submit' block onClick={logInUser}>Login</Button>
                  <div className='register-link'>
                    <p>Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                  </div>

                  <Divider style={{ borderColor: "black" }}>or login with</Divider>

                  <div className='socialLogin'>
                    <GoogleOutlined
                      className='socialIcon'
                      onClick={login}
                      style={{ color: "red" }}
                    />
                    <FacebookFilled
                      className='socialIcon'
                      onClick={login}
                      style={{ color: "blue" }}
                    />
                    <TwitterOutlined
                      className='socialIcon'
                      onClick={login}
                      style={{ color: "cyan" }}
                    />
                  </div>
                </Form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default LoginForm;