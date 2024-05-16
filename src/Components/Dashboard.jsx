import axios from "axios";
import React, { useEffect, useState } from "react";
import Mentor from "./Mentor";
import Student from "./Student";
import errorimage from "/404.gif"

const Dashboard = ({ userData, baseURL, setTaskId }) => {
  const user = userData;
    
  return user ? (
    
      <div className="position-relative">
        <h5 className="text-4 text-xl text-end  me-5 mt-2">
          Username: <span className="text-primary">{userData.name}</span>
          <br></br>
        </h5>
        <h6 className="text-end  me-5">
        Role: <span className="text-primary">{userData.role}</span>
          
        </h6>
        <hr className="shadow-xl" />
     {/* To load the respective dashboard based on the role of the user */}
        {userData.role == "Mentor" ? <Mentor baseURL={baseURL} userData={userData} /> : <Student baseURL={baseURL} userData={userData} setTaskId = {setTaskId} />}
      
        </div>
    ) : (
      <>
        {/*  To display an error message if it is reloaded */ }
        <div className="text-danger text-uppercase d-flex align-items-center justify-content-center" style={{height:"600px"}}>
          <img
            src={errorimage}
            width={50}
            className="mb-2 me-2"
            alt="error"
          />{" "}
          UserData not found.{" "}
        
          <a
            className="text-mindaro ms-4 underline underline-offset-4"
            href="/login"
          >
            Login again to continue
          </a>
        </div>
      </>
    );
  };

export default Dashboard;
