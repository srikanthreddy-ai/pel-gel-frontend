import React, { useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBSpinner,
  MDBCarousel,
  MDBCarouselItem
} from "mdb-react-ui-kit";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    if (!email || !pass) {
      setError("Please fill in both fields");
      return;
    }

    setError(null);
    setLoading(true); // Start loading

    try {
      const response = await axiosInstance.post("/login", {
        username: email,
        password: pass,
      });

      if (response.data) {
        const token = response.data.token;
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userName", email);
        navigate("/home");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="./PEL.png" style={{ width: "185px" }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1"></h4>
            </div>

            <p>Please login to your account</p>

            <MDBInput
              wrapperClass="mb-4"
              label="UserName"
              id="email"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="pass"
              type="password"
            />

            {error && <p className="text-danger">{error}</p>}

            <div className="text-center pt-1 mb-5 pb-1">
              {loading ? (
                <MDBBtn className="mb-4 w-100 gradient-custom-2" disabled>
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                  Signing in...
                </MDBBtn>
              ) : (
                <MDBBtn
                  className="mb-4 w-100 gradient-custom-2"
                  onClick={handleSubmit}>
                  Sign in
                </MDBBtn>
              )}
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <MDBCarousel showIndicators showControls fade>
            <MDBCarouselItem itemId={1}>
              <img
                src="./PEL.png"
                className="d-block w-100"
                alt="Slide 1"
              />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
              <img
                src="./PEL.png"
                className="d-block w-100"
                alt="Slide 2"
              />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
              <img
                src="./PEL.png"
                className="d-block w-100"
                alt="Slide 3"
              />
            </MDBCarouselItem>
          </MDBCarousel>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
