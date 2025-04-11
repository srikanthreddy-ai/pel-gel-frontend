import React, { useState } from 'react';
import axiosInstance from '../Utils/axiosInstance';  // Import your custom Axios instance
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../Utils/EmailContext';

const Login = () => {
  const navigate = useNavigate();
  const { setEmail } = useEmail();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    // Perform basic validation
    if (!email || !pass) {
      setError('Please fill in both fields');
      return;
    }

    // Clear previous error
    setError(null);

    try {
      // Make the POST request using the custom Axios instance
      const response = await axiosInstance.post('/login', {
        username : email,
        password: pass
      });
      console.log(response.data); // Log the response data for debugging
      if (response.data) {
        const token = response.data.token; // Assuming the token is returned in `response.data.token`

        // Store token in sessionStorage
        sessionStorage.setItem('authToken', token);

        // Also store the email in context (if needed)
        setEmail(email);

        // Navigate to home page
        navigate('/home');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://www.pelgel.com/images/logo.png"
                style={{ width: '185px' }} alt="logo"
              />
              
            </div>

            <p>Please login to your account</p>

            <MDBInput wrapperClass='mb-4' label='UserName' id='email' type='email' />
            <MDBInput wrapperClass='mb-4' label='Password' id='pass' type='password' />

            {error && <p className="text-danger">{error}</p>} {/* Display error message */}

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSubmit}>
                Sign in
              </MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

          </div>
        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
