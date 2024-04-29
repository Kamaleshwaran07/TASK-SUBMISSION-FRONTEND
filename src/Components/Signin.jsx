import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import userimage from "/user.png"
import eyeclosed from "/watch.png"
import eyeopen from "/view.png"
import communication from "/communication.png"

const Signin = ({ baseURL }) => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState({
    username: "",
    name: "",
    password: "",
    role: "",
  });
  // To show a toast message for 5 seconds
  useEffect(() => {
    if (responseMsg) {
      setShowToast(true);
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 5000); // Adjust the duration as needed
      return () => clearTimeout(timeout);
    }
  }, [responseMsg]);
 
// Validation schema
  const schema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        "Invalid email"
      )
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .min(5, "Password must contain atleast 5 characters")
      .required("Password is required"),
  });

  // Use of Formik for form validation
  const formik = useFormik({
    initialValues: {
      data,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      
      try {

        const res = await axios.post(`${baseURL}signup/`, values); // signin api call

        setResponseMsg(res.data.message);
        setShowToast(true)
        setData("")
       
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMsg(error.response.data.message);
          setShowToast(true)
        } else {
          setErrorMsg("An error occurred");
        }
      }
    },
  });
 
  return (
    <div className="container-fluid ">
      <h4 className="text-center mt-3 text-uppercase">Sign up to start submitting your tasks</h4>
      <div class="login-box ms-auto me-auto mt-5">
        <h3 className="text-white mb-4">Sign Up</h3>

        <form onSubmit={formik.handleSubmit}>
          <div class="form-floating   mb-3 position-relative">
            <input
              type="email"
              class="form-control rounded-end"
              name="username"
              id="floatingInput"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="name@example.com"
              aria-label=""
              aria-describedby="button-addon2"
            />

            <div
              class="position-absolute bg-white d-flex align-items-center justify-content-center "
              id=""
              style={{ height: "55px", width: "55px", top: 0, right: 0 }}
            >
              <img
                src={communication}
                alt="email"
                className="w-50"
              />
            </div>

            <label name="username" for="floatingInput">
              Email address
            </label>
            <div className="text-danger">{formik.errors.username}</div>
          </div>
          <div class="form-floating mb-3 position-relative">
            <input
              type="text"
              class="form-control"
              value={formik.values.name}
              id="floatingName"
              name="name"
              onChange={formik.handleChange}
              placeholder="Name"
            />

            <div
              class="position-absolute bg-white d-flex align-items-center justify-content-center "
              id=""
              style={{ height: "55px", width: "55px", top: 0, right: 0 }}
            >
              <img
                src={userimage}
                alt="user"
                className="w-50"
              />
            </div>

            <label name="name" for="floatingPassword">
              Name
            </label>
            <div className="text-danger">{formik.errors.name}</div>
          </div>
          <div class="form-floating ">
            <input
              type={isPasswordHidden ? "password" : "text"}
              class="form-control "
              id="floatingPassword"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              placeholder="Password"
              style={{ height: "100%" }}
            />

            <button
              className="position-absolute bg-white border-0 d-flex align-items-center justify-content-center"
              type="button"
              style={{ height: "30px", width: "30px", top: 12.5, right: 10 }}
              onClick={() => setPasswordHidden(!isPasswordHidden)}
            >
              {isPasswordHidden ? (
                <img
                  src={eyeclosed}
                  alt="showpassword"
                />
              ) : (
                <img
                  src={eyeopen}
                  alt="hidepassword"
                />
              )}
            </button>

            <label name="password" for="floatingPassword">
              Password
            </label>
            <div className="text-danger">{formik.errors.password}</div>
          </div>
          <div>
            <label for="role" name="role">
             Role
            </label>

            <select
              className="form-select"
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option disabled selected>Select your role</option>
              <option value="Student">Student</option>
              <option value="Mentor">Mentor</option>
            </select>
          </div>

          <p
            className="text-white float-end"
            style={{ marginTop: "1em", right: 0 }}
          >
            Already have an account?{" "}
            <a href="/login" className="text-decoration-underline">
              Login here
            </a>
          </p>
          <button
            className="btn btn-primary mt-2"
            type="submit"
            style={{ marginLeft: "100px" }}
          >
            Sign Up
          </button>
        </form>
      </div>
      {/* <div> */}
        {responseMsg && (
          <>
            {showToast && (
              <div className="toaster text-primary fw-bold d-flex p-2 align-items-center" style={{top:"75px", right:"40px", borderRadius:"5px"}}>
              <img src="../user.gif" alt="success" className="mr-2" />{responseMsg}!!!
                </div>
            )}
          </>
        )}
        {errorMsg && (
          <>
            {showToast && (
              <div className="bg-danger position-flex flex-row align-items-center text-white py-2  toaster" style={{top:60, right:5}}>
              <img src="../404.gif" alt="success" className="mr-2" /> {errorMsg}
              </div>
            )}
          </>
        )}
      
    {/* </div> */}
</div>
  );
};

export default Signin;
