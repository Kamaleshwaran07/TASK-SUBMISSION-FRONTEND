import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Resetpassword = ({ baseURL }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
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

    const getUserId = async (e) => {
        e.preventDefault()
        const payload = { username }
        // console.log(payload);
        // Sending the username as payload to get the data about user
        try {
            const res = await axios.post(`${baseURL}getUserInfo/`, payload);
            const  {user}  = res.data;
            // console.log(user);// Extract userId and token from response
            setResponseMsg(res.data.message);
            setUserId(user._id); // Set userId in state
            setToken(user.token); // Set token in state

        }
        catch (error) {

            console.log(error);
        }

    };
    // Handle Resetting the password
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { password };
        // console.log(payload);
        // Constructing the url from userId and token got from the backend 
        const url = `${baseURL}resetpassword/${userId}/${token}`
        await axios.post(url, payload)
            .then((res) => setResponseMsg(res.data.message))
            .catch((err) => console.log(err));

    }
    return (
        <div className='fixed left-1/3 top-1/3 me-auto p-2 drop-shadow-2xl w-2/5 border-2 rounded-lg h-auto   border-solid border-slate-500 bg-green-500'>
            <div className='text-4xl text-center'>
                Reset Password
            </div>
            <form onSubmit={handleSubmit} >
                <label className='ms-3 font-semibold text-lg' name='username'>
                    Username:
                </label>
                <br />
                <input className='h-10 font-normal ms-2  w-3/5 pr-12 pl-3 py-2 border-2 border-solid border-blue-100 shadow-xl rounded-md' type='email' name='username' placeholder='Enter  your registered mail id' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button className='mt-2 mb-2 font-bold text-md rounded-lg ms-6 bg-white shadow-xl p-2' type='button' onClick={getUserId} >Check the username</button>
                <br />
                <label name='password' className='ms-3 font-semibold text-lg'>
                    New Password:
                    <br />
                    <input className='h-10 font-normal ms-2  w-3/5 pr-12 pl-3 py-2 border-2 border-solid border-blue-100 shadow-xl rounded-md' type='password' name='password' placeholder='Enter your new password'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button className='mt-6 mb-2 font-bold text-md rounded-lg ms-12 bg-white shadow-xl p-2' type='submit' >Reset Password</button>
                <Link className='pt-2 ms-6 text-lg font-semibold text-white decoration-sky-900 underline underline-offset-4' to='/login'>Click here to go to Login page</Link>
                <div className='mb-2 mt-4 font-semibold ms-6 text-lg bg-white rounded-lg px-4 w-full'>{responseMsg}</div>
            </form>
            <div>
                {showToast && (
                    <div className="toast bg-blue-500 text-white py-2 px-4 rounded-md fixed top-16 right-5 transition duration-500">
                        {responseMsg}
                    </div>
                )}
            </div>
        </div>

    );
};

export default Resetpassword;