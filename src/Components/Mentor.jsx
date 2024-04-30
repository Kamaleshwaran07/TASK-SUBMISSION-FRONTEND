import axios from "axios";
import React, { useEffect, useState } from "react";

const Mentor = ({ baseURL, userData }) => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

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
    const response = await axios.post(`${baseURL}gettask/${userId}`);
    setData(response.data.submittedTask);
    // console.log(response.data.submittedTask);
    setResponseMsg(response.data.message);
    setShowToast(true);
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
  // To fetch the data on load
  useEffect(() => {
    fetchData();
  }, [baseURL, userId]);
  console.log(comment, score);
  return (
      <div>
          <button type="button" onClick={fetchData()}>Refresh</button>
      <div className="card">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <h4>Task Name: {item.title}</h4>
                <h6>
                  Front End Code:{" "}
                  <span>
                    <a href={item.frontEndCode}>{item.frontEndCode}</a>
                  </span>
                </h6>
                <h6>
                  Front End Code:{" "}
                  <span>
                    <a href={item.frontEndUrl}>{item.frontEndUrl}</a>
                  </span>
                </h6>
                <h6>
                  Front End Code:{" "}
                  <span>
                    <a href={item.backEndCode}>{item.backEndCode}</a>
                  </span>
                </h6>
                <h6>
                  Front End Code:{" "}
                  <span>
                    <a href={item.backEndUrl}>{item.backEndUrl}</a>
                  </span>
                </h6>
                <div class="form-floating   mb-3 position-relative">
                  <input
                    type="text"
                    class="form-control shadow-lg rounded-end"
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
                  />

                  <label name="comment" for="floatingInput">
                    Comment
                  </label>
                </div>

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

                <button
                  onClick={handleSubmit}
                  class="btn btn-primary"
                  type="submit"
                  id=""
                >
                  Submit
                </button>
              </div>
            </div>
          );
        })}
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
            className="toaster text-danger fw-bold d-flex p-2 align-items-center"
            style={{ top: "125px", right: "40px", borderRadius: "5px" }}
          >
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentor;
