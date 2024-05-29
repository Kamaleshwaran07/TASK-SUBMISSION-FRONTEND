import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Student = ({ userData, baseURL, setTaskId }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [submittedTask, setSubmittedTask] = useState([]);
  const [evaluatedTask, setEvaluatedTask] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const userId = userData._id;
  const navigate = useNavigate();

  // Fetching the submitted task
  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseURL}gettask/${userId}`);
      setData(response.data.comments);
      setPendingData(response.data.pendingTask);
      setSubmittedTask(response.data.submittedTasks);
      setEvaluatedTask(response.data.evaluatedTask);

      const filtered = response.data.pendingTask.filter(
        (pendingData) =>
          !response.data.submittedTasks.some(
            (submittedTask) => submittedTask.taskId === pendingData.taskId
          )
      );

      setFilteredTask(filtered);
    } catch (error) {
      setErrorMsg(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  const handleEdit = (taskId) => {
    setTaskId(taskId);
    setPendingData([]);
    navigate("/tasksubmit");
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container">
      {isLoading && (
        <div
          className="position-absolute"
          style={{ left: "45%", paddingBottom: "9rem", marginTop: "10rem" }}
        >
          <div className="loginLoader">
            <div className="half"></div>
            <div className="half"></div>
          </div>
          <br />
        </div>
      )}

      {!isLoading && (
        <>
          <nav className="fixed-top d-flex" style={{ top: "6em", left: "3em" }}>
            <button
              id={visible ? "active" : null}
              className="btn border border-2 pt-2 pb-0 ms-0 me-2"
              onClick={() => {
                setVisible(!visible);
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              }}
            >
              <h6>Pending Task</h6>
            </button>
            <button
              id={visible ? null : "active"}
              className="btn border border-2 pt-2 pb-0 ms-0"
              onClick={() => {
                setVisible(!visible);
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              }}
            >
              <h6>Submitted Tasks</h6>
            </button>
            <button
              className="btn ms-3 pt-2 pb-0 d-flex bg-primary text-white"
              type="button"
              onClick={() => fetchData()}
            >
              Refresh
              {isLoading && (
                <div className="loaderContainer ms-2">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              )}
            </button>
          </nav>
          <div>
            {visible ? (
              <div className="container" href="/form">
                <h3>Task Submission</h3>
                <div>
                  {filteredTask.map((item, index) => (
                    <div
                      className="d-flex align-items-center justify-content-evenly gap-2 p-2"
                      key={index}
                      style={{ width: "35rem" }}
                    >
                      <h5>
                        Title:{" "}
                        <span className="text-primary">{item.title}</span>
                      </h5>
                      <h6 className="fw-normal">
                        Status:{" "}
                        <span className="text-danger">{item.status}</span>
                      </h6>
                      <button
                        className="btn border-2 btn-primary float-end"
                        onClick={() => handleEdit(item.taskId)}
                      >
                        Submit your task
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div href="/tasks" className={visible ? "d-none" : "row ms-0"}>
                <table className="table table-hover table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Comment</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  {evaluatedTask === null ? (
                    <div>
                      <h1 className="text-center">No tasks evaluated yet</h1>
                    </div>
                  ) : (
                    <>
                      {evaluatedTask.map((item, index) => (
                        <tbody key={index}>
                          <tr>
                            <td className="w-25">
                              <span className="ms-2 text-primary-emphasis">
                                {item.title}
                              </span>
                            </td>
                            <td className="w-25">
                              <span className="ms-2 text-primary-emphasis">
                                {item.status}
                              </span>
                            </td>
                            <td className="w-75 overflow-auto">
                              <span className="ms-2">{item.comment}</span>
                            </td>
                            <td className="w-50">
                              {item.score >= 6 && item.score < 8 && (
                                <span
                                  className="ms-2"
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
                              {item.score === "Not yet Graded" && (
                                <span
                                  className="ms-2"
                                  style={{ color: "orange" }}
                                >
                                  {item.score}
                                </span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </>
                  )}
                </table>
                <table className="table table-hover table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Comment</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  {submittedTask.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td className="w-25">
                          <span className="ms-2 text-primary-emphasis">
                            {item.title}
                          </span>
                        </td>
                        <td className="w-25">
                          <span className="ms-2 text-primary-emphasis">
                            {item.status}
                          </span>
                        </td>
                        <td className="w-75 overflow-auto">
                          <span className="ms-2">{item.comment}</span>
                        </td>
                        <td className="w-50">
                          {item.score >= 6 && item.score < 8 && (
                            <span className="ms-2" style={{ color: "orange" }}>
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
                          {item.score === "Not yet Graded" && (
                            <span className="ms-2" style={{ color: "orange" }}>
                              {item.score}
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            )}
          </div>
        </>
      )}
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
