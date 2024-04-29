import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Forgotpassword = ({ baseURL }) => {
    const [username, setUsername] = useState('');
    const [responseMsg, setResponseMsg] = useState('')
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (responseMsg) {
            setShowToast(true);
            const timeout = setTimeout(() => {
                setShowToast(false);
            }, 5000); // Adjust the duration as needed
            return () => clearTimeout(timeout);
        }
    }, [responseMsg]);
    // Sending the username as payload to the backend and generating the email
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { username };
        // console.log(payload);
        const url = `${baseURL}forgotpassword`
        // console.log(url);
        try {
            const res =  await axios.post(url, payload)
                setResponseMsg(res.data.message)
            } catch (error) {
            console.error('Error sending reset password link:', error);
            console.log(error);
        }
      

    }
    return (
        <div className='position-fixed p-2 border-2 rounded-4' style={{width:"40%", height:"40%", border:"solid grey 2px", borderRadius:"15px", marginLeft:"30%", marginTop:"100px", boxShadow: "-15px 0px 50px" }}>
          
                
            <div className='fs-2 text-center'>Forgot Password</div>
            <form onSubmit={handleSubmit} className='mt-4 row'>
                <div className='col mt-3'>

                    
                    <input className='pl-3 py-2 rounded-sm' type='email' name='username' placeholder='Enter your registered mail id' value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "60%",marginLeft:"7em",height:"50px", paddingRight:"12px", border: "solid grey 2px", borderRadius: "10px" }} />
                    <br />
                
                </div>
                <br />
                <div className='mt-4' style={{width:"100%"}} >
                    <button className='fw-bold fs-6 rounded-lg shadow-xl btn p-2' type='submit' style={{boxShadow:"-10px 0px 10px grey", marginLeft:"12em"}}>Send Reset Password Link</button>
                        

                </div>
                    <div className='mb-5 mt-4 fw-bold ms-5'>{responseMsg}
                    </div>
            </form>
            
            <div>
                {showToast && (
                    <div className="toaster text-primary fw-bold d-flex p-2 align-items-center" style={{ top: "75px", right: "40px", borderRadius: "5px" }}>
                        {responseMsg}
                    </div>
                )}
            </div>
            

        </div>
    );
};

export default Forgotpassword;