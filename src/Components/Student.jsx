import axios from "axios";
import { setNestedObjectValues } from "formik";
import React, { useEffect, useState } from "react";

const Student = ({ userData, baseURL }) => {
  const [frontendcode, setFrontendCode] = useState("");
  const [frontendurl, setFrontendUrl] = useState("");
  const [backendcode, setBackendCode] = useState("");
  const [backendurl, setBackendUrl] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
    const [visible, setVisible] = useState(false);
    // const [visibleTask, setVisibleTask] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
  const userId = userData._id;
  // console.log(userId);

  // Fetching the submitted task
  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseURL}gettask/${userId}`);
      setIsLoading(true)
        setData(response.data.comments);
        setPendingData(response.data.pendingTask);
        setTimeout(() => {
            setIsLoading(false)
        },1500)
    } catch {
      setErrorMsg(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payloads = {
      title,
      frontendcode,
      frontendurl,
      backendcode,
      backendurl,
    };
    try {
      const response = await axios.post(
        `${baseURL}posttaskurls/${userId}`,
        payloads
      ); // Sending the data to the backend
      setResponseMsg(response.data.message);
      setShowToast(true);
      setBackendCode("");
      setBackendUrl("");
      setFrontendCode("");
      setFrontendUrl("");
      setTitle("");
      fetchData();
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowToast(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const handleVisibilityform = () => {

  // }
  return (
    <div className="container">
      <nav
        className="position-absolute d-flex"
        style={{ top: "5.2em", left: "3em" }}
      >
        <button
          id={visible ? "active" : null}
          className="btn border border-2 pt-2 pb-0 ms-0 me-2"
          onClick={() => setVisible(!visible)}
        >
          <h6>Pending Task</h6>
        </button>
        <button
          id={visible ? null : "active"}
          className="btn border border-2 pt-2 pb-0 ms-0"
          onClick={() => setVisible(!visible)}
        >
          <h6>Submitted Tasks</h6>
        </button>
        <button
          className="btn ms-3 pt-2 pb-0 d-flex  bg-primary text-white"
          type="button"
          onClick={() => fetchData()}
        >
          Refresh
          {isLoading && (
            <div class="loaderContainer ms-2">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          )}
        </button>
      </nav>
      <div className="" style={{}}>
        {/* Handling the task submission form*/}
        {visible ? (
          <div className="container-fluid" href="/form">
            <h3>Task Submission</h3>
            <div className="row justify-content-evenly">
              {pendingData.map((item, index) => {
                const dateandtime = item.createdAt;
                const split = dateandtime.split(", ");
                return (
                  <div
                    className="card py-3  col-3"
                    key={index}
                    style={{ height: "25em" }}
                  >
                    <h5>
                      Title: <span className="text-primary">{item.title}</span>
                    </h5>
                    <h6 className="fw-normal">
                      Status: <span className="text-danger">{item.status}</span>
                    </h6>
                    {item.typeoftask === "Frontend" && (
                      <>
                        <form
                          className=" rounded-3 py-3"
                          onSubmit={handleSubmit}
                        >
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
                            />

                            <label
                              className="fw-normal"
                              name="frontendurl"
                              for="floatingInput"
                            >
                              Front-End URL
                            </label>
                          </div>
                          <button class="btn btn-primary" type="submit" id="">
                            Submit
                          </button>
                        </form>
                        <div>
                          Date: <span>{split[0]}</span>
                        </div>
                        <div>
                          Time: <span>{split[1]}</span>
                        </div>
                      </>
                    )}

                    {item.typeoftask === "Backend" && (
                      <>
                        <form
                          className=" rounded-3 py-3"
                          onSubmit={handleSubmit}
                        >
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
                            />

                            <label
                              className="fw-normal"
                              name="backendurl"
                              for="floatingInput"
                            >
                              Back-End URL
                            </label>
                          </div>
                          <button class="btn btn-primary" type="submit" id="">
                            Submit
                          </button>
                        </form>
                        <div>
                          Date: <span>{split[0]}</span>
                        </div>
                        <div>
                          Time: <span>{split[1]}</span>
                        </div>
                      </>
                    )}

                    {item.typeoftask === "FullStack" && (
                      <>
                        <form
                          className=" rounded-3 py-3"
                          onSubmit={handleSubmit}
                        >
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
                            />

                            <label
                              className="fw-normal"
                              name="backendurl"
                              for="floatingInput"
                            >
                              Back-End URL
                            </label>
                          </div>
                          <button class="btn btn-primary" type="submit" id="">
                            Submit
                          </button>
                        </form>
                        <div>
                          Date: <span>{split[0]}</span>
                        </div>
                        <div>
                          Time: <span>{split[1]}</span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            {/* <div class="form-floating   mb-3 position-relative">
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
                />

                <label
                  className="fw-normal"
                  name="backendurl"
                  for="floatingInput"
                >
                  Back-End URL
                </label>
              </div>
              <button class="btn btn-primary" type="submit" id="">
                Submit
              </button> */}
          </div>
        ) : (
          <div href="/tasks" className={visible ? "d-none" : "row  ms-0 "}>
            <div className="col-6 Taskbar"></div>
            <div className="col-6 Taskbar rounded-3 py-2">
              <h4 className="text-center">Submitted Tasks</h4>
              <div className="row gap-2">
                <div className="col-6">
                  {data.map((item, index) => {
                    return (
                      <>
                        <div
                          className="card p-2 m-2 border text-white rounded-3 border-secondary bg-black"
                          id="secandory"
                          style={{ width: "" }}
                          key={index}
                        >
                          <h5 className="me-2">
                            Title:
                            <span className="ms-2 text-primary">
                              {item.title}
                            </span>
                          </h5>
                          <h5 className="me-2">
                            Status:
                            <span className="ms-2 text-info">
                              {item.status}
                            </span>
                          </h5>
                          <h5 className="me-2">
                            Comment:
                            <span className="ms-2">{item.comment}</span>
                          </h5>
                          <h5 className="me-2">
                            Score:
                            {item.score >= 6 && item.score < 8 && (
                              <span
                                className="ms-2 "
                                style={{ color: "orange" }}
                              >
                                {item.score}
                              </span>
                            )}
                            {item.score >= 8 && item.score <= 10 && (
                              <span className="ms-2 text-success">
                                {item.score}
                              </span>
                            )}
                            {item.score >= 1 && item.score <= 5 && (
                              <span className="ms-2 text-danger">
                                {item.score}
                              </span>
                            )}
                          </h5>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {showToast && responseMsg && (
          <div
            className="toaster text-primary fw-bold d-flex p-2 align-items-center"
            style={{ top: "125px", right: "40px", borderRadius: "5px" }}
          >
            {responseMsg}
          </div>
        )}
        {showToast && errorMsg && (
          <div
            className="toaster text-primary fw-bold d-flex p-2 align-items-center"
            style={{ top: "125px", right: "40px", borderRadius: "5px" }}
          >
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
