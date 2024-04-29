import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import eyeopen from "/watch.png";
import eyecloses from "/view.png";
import communication from "/communication.png"

const Login = ({ baseURL, setUserData, setIsAuthenticated }) => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  // Toast Message for 5 seconds

  useEffect(() => {
    if (responseMsg || errorMsg) {
      setShowToast(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setShowToast(false);
      }, 5000); // Adjust the duration as needed
      return () => clearTimeout(timeout);
    }
  }, [responseMsg, errorMsg]);

  // Yup validation schema
  const schema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        "Invalid email"
      )
      .required("Email is required"),

    password: Yup.string()
      .min(5, "Password must contain atleast 5 characters")
      .required("Password is required"),
  });
  // Use of formik for form validation
  const formik = useFormik({
    initialValues: {
      data,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseURL}login/`, values);

        setIsLoading(true);
        setResponseMsg(response.data.message);
        setUserData(response.data.user);
        setIsAuthenticated(true);
        // console.log(setUserData);
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard after 3 seconds
        }, 3000);
      } catch (error) {
        setIsLoading(false);
        setErrorMsg(error.response.data.message);
      }
    },
  });
  return (
    <div>
      {/* Loader animation */}
      {isLoading && (
        <div
          className="position-absolute"
          style={{ left: "45%", paddingBottom: "9rem", marginTop: "15rem" }}
        >
          <div className="loginLoader">
            <div className="half"></div>
            <div className="half"></div>
          </div>
          <br />
          <h3 className="text-primary d-block fs-4">Logging you in</h3>
        </div>
      )}

      {!isLoading && (
        <div className="container-fluid ">
          <div class="login-box ms-auto me-auto">
            <h3 className="text-white mb-4">Sign Up</h3>
            <form onSubmit={formik.handleSubmit}>
              <div class="form-floating   mb-3 position-relative">
                <input
                  type="email"
                  class="form-control rounded-end"
                  onChange={formik.handleChange}
                  id="floatingInput"
                  value={formik.values.username}
                  name="username"
                  placeholder="name@example.com"
                  aria-label=""
                  aria-describedby="button-addon2"
                />

                <div
                  class="position-absolute bg-white d-flex align-items-center justify-content-center "
                  id="button-addon2"
                  style={{ height: "55px", width: "55px", top: 0, right: 0 }}
                >
                  <img src={communication} alt="" className="w-50" />
                </div>

                <label name="username" for="floatingInput">
                  Email address
                </label>
              </div>

              <div class="form-floating ">
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  class="form-control "
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  style={{ height: "100%" }}
                />

                <button
                  className="btn position-absolute d-flex align-items-center justify-content-center"
                  type="button"
                  style={{
                    height: "25px",
                    width: "25px",
                    top: 15,
                    right: 12.5,
                  }}
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                >
                  {isPasswordHidden ? (
                    <img src={eyeopen} alt="showpassword" />
                  ) : (
                    <img src={eyecloses} alt="hidepassword" />
                  )}
                </button>

                <label name="password" for="floatingPassword">
                  Password
                </label>
              </div>
              <p
                className="text-white float-end"
                style={{ marginTop: "1em", right: 0 }}
              >
                Forgot your password?{" "}
                <a href="/forgotpassword" className="text-decoration-underline">
                  Click here to reset
                </a>
              </p>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                style={{ marginLeft: "125px" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
      {!isLoading && responseMsg && (
        <div>
          {showToast && (
            <div
              className="toaster bg-primary text-white py-2 px-4 rounded-md position-fixed "
              style={{ top: "16px", right: "5px", transitionDuration: 500 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="13.25 13.25 37.5 37.5"
                enable-background="new 0 0 64 64"
              >
                <g>
                  <g></g>

                  <circle
                    fill="#FFFFFF"
                    stroke="#000000"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    cx="32"
                    cy="32"
                    r="17.5"
                  />
                </g>
                <g>
                  <polyline
                    fill="none"
                    stroke="#536DFE"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    points="   21.5,32 28.5,39 42.5,25  "
                  />
                </g>
              </svg>
              <br /> {responseMsg}
            </div>
          )}
        </div>
      )}
      {!isLoading && errorMsg && (
        <div>
          {showToast && (
            <div
              className="toaster d-flex flex-row align-items-center text-danger py-2 px-4 rounded-md position-fixed"
              style={{ top: "16px", right: "5px", transitionDuration: 500 }}
            >
              <img
                src="https://media.discordapp.net/attachments/1018124413176135700/1228545611192729652/wired-lineal-1140-error.gif?ex=662c6f42&is=6619fa42&hm=6189a496554b97d93eea88574f7c70df7864fbbe34bdb12793a7c10acfbdeedc&=&width=480&height=480"
                width={50}
                className=" me-2"
                alt="error"
              />
              <div className="text-danger fw-bold">{errorMsg}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
