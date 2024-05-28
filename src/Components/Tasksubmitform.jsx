import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import errorImage from '/404.gif'

const Tasksubmitform = ({ baseURL, taskId, userID, userData}) => {
     const [frontendcode, setFrontendCode] = useState("");
     const [frontendurl, setFrontendUrl] = useState("");
     const [backendcode, setBackendCode] = useState("");
  const [backendurl, setBackendUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
 const [responseMsg, setResponseMsg] = useState("");
 const [errorMsg, setErrorMsg] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [data, setData] = useState([])
    //   const [title, setTitle] = useState("");
    const userId= userData._id
    const fetchData = async () => {
        try {
          const response = await axios.post(`${baseURL}gettaskId/${taskId}`)
          setData(response.data)
          console.log(response.data);
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }

  }
useEffect(() => {
    fetchData();
}, []);
  const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      const payloads = {
        frontendcode,
        frontendurl,
        backendcode,
        backendurl,
      };
      try {
        const response = await axios.post(
          `${baseURL}posttaskurls/${taskId}/${userId}`,
          payloads
        ); // Sending the data to the backend
        setResponseMsg(response.data.message);
        // setShowToast(true);
        setBackendCode("");
        setBackendUrl("");
        setFrontendCode("");
        setFrontendUrl("");
        navigate('/dashboard')
        // setTitle("");
        fetchData();
      } catch (error) {
        setErrorMsg("error.response.data.message");
        // setShowToast(true);
      }
  };
 
  if (data.length === 0) {
    navigate('/login')
  }
  return (
    <div className="container rounded mt-5" style={{ width: "35em" }}>
      {/* {data.map((item, index) => {
                return (
                    <div key={index}>
                        {item.title}
                    </div>
                )
            })} */}
      <div className="d-flex float-end">
        Task created on Date: {data.createdDate}{" "}
        <span className='ms-2'>

        Time: {data.createdTime}
        </span>
      </div>
      <h6>
        Title: <span className='text-primary'>{data.title}</span>
      </h6>
      <form className=" rounded-3 p-3" onSubmit={handleSubmit}>
        {data.typeoftask === "Frontend" && (
          <>
            <div class="form-floating mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setFrontendCode(e.target.value)}
                id="floatingInput"
                value={frontendcode}
                name="frontendcode"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="frontendcode"
                for="floatingInput"
              >
                Front-End Code URL
              </label>
            </div>
            <div class="form-floating  mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setFrontendUrl(e.target.value)}
                id="floatingInput"
                value={frontendurl}
                name="frontendurl"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="frontendurl"
                for="floatingInput"
              >
                Front-End URL
              </label>
            </div>
            {/* <button class="btn btn-primary" type="submit" id="">
              Submit
            </button>
         */}
          </>
        )}

        {data.typeoftask === "Backend" && (
          <>
            {/* <form className=" rounded-3 py-3" onSubmit={handleSubmit}> */}
            <div class="form-floating   mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setBackendCode(e.target.value)}
                id="floatingInput"
                value={backendcode}
                name="backendcode"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="backendcodeurl"
                for="floatingInput"
              >
                Back-End Code URL
              </label>
            </div>
            <div class="form-floating   mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setBackendUrl(e.target.value)}
                id="floatingInput"
                value={backendurl}
                name="backendurl"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="backendurl"
                for="floatingInput"
              >
                Back-End URL
              </label>
            </div>
            {/* <button class="btn btn-primary" type="submit" id="">
              Submit
            </button> */}
            {/* </form> */}
            {/* <div>
                          Date: <span>{split[0]}</span>
                        </div>
                        <div>
                          Time: <span>{split[1]}</span>
                        </div> */}
          </>
        )}

        {data.typeoftask === "FullStack" && (
          <>
            {/* <form className=" rounded-3 py-3" onSubmit={handleSubmit}> */}
            <div class="form-floating   mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setFrontendCode(e.target.value)}
                id="floatingInput"
                value={frontendcode}
                name="frontendcode"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="frontendcode"
                for="floatingInput"
              >
                Front-End Code URL
              </label>
            </div>
            <div class="form-floating   mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setFrontendUrl(e.target.value)}
                id="floatingInput"
                value={frontendurl}
                name="frontendurl"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="frontendurl"
                for="floatingInput"
              >
                Front-End URL
              </label>
            </div>
            <div class="form-floating   mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setBackendCode(e.target.value)}
                id="floatingInput"
                value={backendcode}
                name="backendcode"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="backendcodeurl"
                for="floatingInput"
              >
                Back-End Code URL
              </label>
            </div>
            <div class="form-floating   mb-3 position-relative">
              <input
                type="text"
                class="form-control shadow-lg rounded-end"
                onChange={(e) => setBackendUrl(e.target.value)}
                id="floatingInput"
                value={backendurl}
                name="backendurl"
                placeholder=""
                aria-label=""
                aria-describedby="button-addon2"
                required
              />

              <label
                className="fw-normal"
                name="backendurl"
                for="floatingInput"
              >
                Back-End URL
              </label>
            </div>
            {/* <div>
                          Date: <span>{split[0]}</span>
                        </div>
                        <div>
                          Time: <span>{split[1]}</span>
                        </div> */}
          </>
        )}
        <button class="btn btn-primary" type="submit" id="">
          Submit
        </button>
      </form>
    </div>
  );
  
}


export default Tasksubmitform;