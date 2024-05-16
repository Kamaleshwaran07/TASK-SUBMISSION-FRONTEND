import React, { useState } from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Login from './Components/Login';
import NavBar from './Components/NavBar';
import Dashboard from './Components/Dashboard';
import Forgotpassword from './Components/Forgotpassword';
import Resetpassword from './Components/Resetpassword';
import Tasksubmitform from './Components/Tasksubmitform';

const App = () => {
  const [taskId, setTaskId] = useState(0)
  const [userID, setUserID] = useState(0);
  
  const baseURL = 'https://task-submission-backend-m1do.onrender.com/api/';
  // const baseURL = "http://localhost:5050/api/";
  const [userData, setUserData] = useState('')
const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const baseURL = 'https://passwordreset-woco.onrender.com';

  return (
    <div>
      <BrowserRouter>
      <NavBar isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signin baseURL={baseURL} />} />
         

          <Route path='/login' element={<Login baseURL={baseURL} setUserData={setUserData} setIsAuthenticated= {setIsAuthenticated} />} />
          <Route path='/dashboard' element={<Dashboard userData={userData} setIsAuthenticated ={setIsAuthenticated} baseURL={baseURL} setTaskId = {setTaskId} setUserID = {setUserID} />} />
 
         <Route path='tasksubmit' element = {<Tasksubmitform baseURL = {baseURL} taskId = {taskId} userID= {userID} userData = {userData} />} />

          <Route path='/forgotpassword' element={<Forgotpassword baseURL={baseURL} />} />
          <Route path='/resetpassword/:userId/:token' element={<Resetpassword baseURL={baseURL} />} />
          
          {/* <Route path='/' element={<Home />} /> */}
        </Routes>
    </BrowserRouter>
    
    </div>
  );
};

export default App;