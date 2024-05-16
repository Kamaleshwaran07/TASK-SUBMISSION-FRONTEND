import axios from "axios";
import React, { useEffect, useState } from "react";

const Mentor = ({ baseURL, userData }) => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [title, setTitle] = useState("");
  const [typeoftask, setTypeOfTask] = useState("")
  const [visible, setVisible] = useState("")
  const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

  // To show toast for 5 seconds
  useEffect(() => {
    if (responseMsg || errorMsg) {
      setShowToast(true);
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [responseMsg, errorMsg]);
  const userId = userData._id;

  // To fetch the submitted tasks
  const fetchData = async () => {
   try {
       const response = await axios.post(`${baseURL}gettask/${userId}`);
      //  setIsLoading(true)
       setData(response.data.submittedTask);
      //  setTimeout(() => {
      //      setIsLoading(false)
      //   }, 3500)
       // console.log(response.data.submittedTask);
       setResponseMsg(response.data.message);
       setShowToast(true);
   } catch (error) {
       setErrorMsg(error.response.data.message);
       setShowToast(true);


   } 
  };

  // To send the task id to the backend
  const utaskId = data.map((item, index) => {
    return item.taskId;
  });
  // console.log(utaskId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payloads = {
      comment,
      score,
    };
    try {
      const response = await axios.post(
        `${baseURL}commentscore/${utaskId}`,
        payloads
      );
      setResponseMsg(response.data.message);
      setData([]);
      fetchData();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        setErrorMsg(error.response.data.message);
      else {
        setErrorMsg("An error occured");
      }
    }
  };
  console.log(title, typeoftask);
  const handleCreateTaskSubmit = async (e) => {
    e.preventDefault()
    const payloads = { title, typeoftask };
    console.log(title, typeoftask);
    // console.log(payloads);
    try {
      const response = await axios.post(`${baseURL}createtask/`, payloads);
      setResponseMsg(response.data.message);
      setTitle("")
    setTypeOfTask("")
      
    } catch (error) {
      setErrorMsg(error.response.data.message)
    }
  }
  // To fetch the data on load
 useEffect(() => {
   setIsLoading(true);
   setTimeout(() => {
     fetchData();
     setIsLoading(false);
   }, 1000);
 }, []);
  console.log(comment, score);
  return (
    <div>
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
          <nav
            className="d-flex position-absolute"
            style={{ top: "5.2em", left: "3em" }}
          >
            <button
              id={visible ? "active" : null}
              className="btn border border-2 pt-2 pb-0 ms-0 me-2"
              onClick={() => {
                setVisible(!visible);
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
                fetchData();
              }}
            >
              <h6>Submitted Tasks </h6>
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
              <h6>Create Task</h6>
            </button>
            <button
              className="btn ms-3 p-2"
              type="button"
              onClick={() => fetchData()}
            >
              Refresh
            </button>
          </nav>

          {visible ? (
            <div className="row">
              {data.length === 0 ? (
                <>
                  <div className="text-warning text-center text-uppercase">
                    There is no task to be evaluated right now
                  </div>
                </>
              ) : (
                <>
                  {data.map((item, index) => {
                    return (
                      <div className="mr-0" key={index}>
                        <div className="container mr-0">
                          <form
                            className="form rounded p-3"
                            onSubmit={handleSubmit}
                            style={{ height: "25em" }}
                          >
                            <div>
                              <h4>Task Name: {item.title}</h4>
                              <h6>
                                Frontend Code:{" "}
                                <span>
                                  <a href={item.frontEndCode}>
                                    {item.frontEndCode}
                                  </a>
                                </span>
                              </h6>
                              <h6>
                                Frontend URL:{" "}
                                <span>
                                  <a href={item.frontEndUrl}>
                                    {item.frontEndUrl}
                                  </a>
                                </span>
                              </h6>
                              <h6>
                                Backend Code:{" "}
                                <span>
                                  <a href={item.backEndCode}>
                                    {item.backEndCode}
                                  </a>
                                </span>
                              </h6>
                              <h6>
                                Backend URL Code:{" "}
                                <span>
                                  <a href={item.backEndUrl}>
                                    {item.backEndUrl}
                                  </a>
                                </span>
                              </h6>
                            </div>
                            <div className="mt-3">
                              <div class="form-floating   mb-3 position-relative">
                                <input
                                  type="text"
                                  class="form-control shadow-lg rounded-end"
                                  onChange={(e) => setScore(e.target.value)}
                                  id="floatingInput"
                                  value={score}
                                  name="score"
                                  placeholder=""
                                  aria-label=""
                                  aria-describedby="button-addon2"
                                  style={{
                                    width: "50%",
                                  }}
                                  required
                                />

                                <label name="score" for="floatingInput">
                                  Score
                                </label>
                              </div>
                              <div class="form-floating   mb-3 position-relative">
                                <textarea
                                  type="text"
                                  class="form-control overflow-auto shadow-lg rounded-end"
                                  onChange={(e) => setComment(e.target.value)}
                                  id="floatingInput"
                                  value={comment}
                                  name="comment"
                                  placeholder=""
                                  aria-label=""
                                  aria-describedby="button-addon2"
                                  style={{
                                    width: "50%",
                                  }}
                                  required
                                ></textarea>

                                <label name="comment" for="floatingInput">
                                  Comment
                                </label>
                              </div>

                              <button
                                class="btn btn-primary"
                                type="submit"
                                id=""
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          ) : (
            <div className="col-6 container mr-0">
              <form onSubmit={handleCreateTaskSubmit}>
                <div class="form-floating   mb-3 position-relative">
                  <input
                    type="text"
                    class="form-control shadow-lg rounded-end"
                    onChange={(e) => setTitle(e.target.value)}
                    id="floatingInput"
                    value={title}
                    name="title"
                    placeholder=""
                    aria-label=""
                      aria-describedby="button-addon2"
                      required
                  />

                  <label className="fw-normal" name="title" for="floatingInput">
                    Title
                  </label>
                </div>
                <div class="  mb-3">
                  <label name="typeoftask">Type of task</label>

                  <select
                    className="form-select"
                    name="typeoftask"
                    value={typeoftask}
                    aria-label="Default select example"
                      onChange={(e) => setTypeOfTask(e.target.value)}
                      required
                  >
                    <option selected disabled>
                      Select Type of Task
                    </option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="FullStack">FullStack</option>
                    </select>
                    
                </div>
                <button class="btn btn-primary" type="submit" id="">
                  Submit
                </button>
              </form>
            </div>
          )}
        </>
      )}
      <div>
        {showToast && responseMsg ? (
          <div
            className="toaster text-primary fw-bold position-absolute d-flex p-2 align-items-center"
            style={{ top: "125px", right: "40px", borderRadius: "5px" }}
          >
            {responseMsg}
          </div>
        ) : (
          showToast &&
          errorMsg && (
            <div
              className="toaster text-danger fw-bold position-absolute d-flex p-2 align-items-center"
              style={{ top: "125px", right: "40px", borderRadius: "5px" }}
            >
              {errorMsg}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Mentor;
