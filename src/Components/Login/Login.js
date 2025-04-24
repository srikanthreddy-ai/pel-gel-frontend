import React, { useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBSpinner
} from "mdb-react-ui-kit";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        username: email,
        password,
      });

      const { token } = response.data;
      if (token) {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userName", email);
        navigate("/home");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="gradient-form" style={{ minHeight: "100vh" }}>
      <MDBRow className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <MDBCol
          md="6"
          className="d-flex flex-column justify-content-center align-items-center p-5"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <div className="text-center mb-4">
              <img src="./PEL.png" style={{ width: "150px" }} alt="PEL Logo" />
              <h4 className="mt-3 mb-2">Welcome Back</h4>
              <p className="text-muted">Please login to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="pass"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              {error && <p className="text-danger text-center">{error}</p>}

              <div className="text-center mb-3">
                <MDBBtn className="w-100 gradient-custom-2" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </MDBBtn>
              </div>
            </form>

            <div className="text-center">
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
