import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Student = ({ userData, baseURL }) => {
    
    const [frontendcode, setFrontendCode] = useState('')
    const [frontendurl, setFrontendUrl] = useState('')
    const [backendcode, setBackendCode] = useState('')
    const [backendurl, setBackendUrl] = useState('')
    const [responseMsg, setResponseMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [title, setTitle]= useState('')
    const [data, setData] = useState([])
    const userId = userData._id
    // console.log(userId);

    // Fetching the submitted task
    const fetchData = async () => {
        try {
            const response = await axios.post(`${baseURL}gettask/${userId}`)
        setData(response.data.comments)
            
        }
        catch {
            setErrorMsg(error.response.data.message)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payloads = {
            title,
            frontendcode,
            frontendurl,
            backendcode,
            backendurl
        };
        try {
            const response = await axios.post(`${baseURL}posttaskurls/${userId}`, payloads) // Sending the data to the backend
            setResponseMsg(response.data.message)
            setShowToast(true)
            setBackendCode('')
            setBackendUrl('')
            setFrontendCode('')
            setFrontendUrl('')
            setTitle('')
            fetchData()
        } catch (error) {
            setErrorMsg(error.response.data.message)
            setShowToast(true)
        }
        
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='container'>
       
            <div className='row'>
            {/* Handling the task submission form*/}
           
                    <form className='form col-6 py-3 ms-0 px-4' onSubmit={handleSubmit} style={{width:"35rem", height:"30em"}}>
                    <h3>Task Submission</h3>
                    <div class="form-floating   mb-3 position-relative">
                        <input type="text" class="form-control shadow-lg rounded-end"
                            onChange={(e) => setTitle(e.target.value)}
                            id="floatingInput" value={title} name="title" placeholder="" aria-label="" aria-describedby="button-addon2" style={{
                                width: "50%"
                            }} />

                        <label name="title" for="floatingInput">Title</label>
                    </div>
                <div class="form-floating   mb-3 position-relative">
                        <input type="text" class="form-control shadow-lg rounded-end"
                        onChange={(e)=>setFrontendCode(e.target.value)}
                        id="floatingInput" value={frontendcode} name="frontendcode" placeholder="" aria-label="" aria-describedby="button-addon2" style={{
                                width: "75%"
                            }}/>

                    <label name="frontendcode" for="floatingInput">Front-End Code URL</label>
                </div>
                <div class="form-floating   mb-3 position-relative">
                        <input type="text" class="form-control shadow-lg rounded-end"
                        onChange={(e)=>setFrontendUrl(e.target.value)}
                        id="floatingInput" value={frontendurl} name="frontendurl" placeholder="" aria-label="" aria-describedby="button-addon2" style={{
                                width: "75%"
                            }}/>

                    <label name="frontendurl" for="floatingInput">Front-End URL</label>
                </div>
                <div class="form-floating   mb-3 position-relative">
                        <input type="text" class="form-control shadow-lg rounded-end"
                        onChange={(e)=>setBackendCode(e.target.value)}
                        id="floatingInput" value={backendcode} name="backendcode" placeholder="" aria-label="" aria-describedby="button-addon2" style={{
                                width: "75%"
                            }}/>

                    <label name="backendcodeurl" for="floatingInput">Back-End Code URL</label>
                </div><div class="form-floating   mb-3 position-relative">
                        <input type="text" class="form-control shadow-lg rounded-end"
                        onChange={(e)=>setBackendUrl(e.target.value)}
                        id="floatingInput" value={backendurl} name="backendurl" placeholder="" aria-label="" aria-describedby="button-addon2" style={{
                                width: "75%"
                            }}/>

                    <label name="backendurl" for="floatingInput">Back-End URL</label>
                </div>
                <button class="btn btn-primary ms-1" type="submit" id="">Submit</button>
            </form>
                    <div className='col-6 Taskbar ms-5 p-3'>
                    <h4>Submitted Tasks</h4>
                    <div className='row'>

                    {data.map((item, index)=>{
                        return(
                            <>
                                
                                <div className='col-5 p-2 m-2 border text-white rounded-3 border-secondary bg-black' id="secandory" style={{  }}  key={index}>
                                    <h5 className='me-2'>
                                        Title:
                                        <span className='ms-2 text-primary'>
                                        {item.title}

                                        </span>
                                    </h5>
                                    <h5 className='me-2'>
                                        Status:
                                        <span className='ms-2 text-info'>
                                        {item.status}
                                            
</span>
                                    </h5>
                                    <h5 className='me-2'>

                                        Comment:
                                        <span className='ms-2'>
                                        {item.comment}

                                        </span>
                                    </h5>
                                    <h5 className='me-2'>
                                        Score: 
                                         {item.score >= 6 && item.score < 8 && (
                                            <span className='ms-2 ' style={{color:"orange"}}>{item.score}</span>
                                        )}
                                        {item.score >= 8 && item.score <= 10 && (
                                            <span className='ms-2 text-success'>{item.score}</span>
                                        )}
                                       {item.score >= 1 && item.score <= 5 && (
                                            <span className='ms-2 text-danger'>{item.score}</span>
                                        )}

                                    </h5>
                                </div>

                    
                    </>
                        
                        )
                })}
                    </div>
            </div>
            </div>
            <div>
                {showToast && responseMsg && (
                    <div className="toaster text-primary fw-bold d-flex p-2 align-items-center" style={{ top: "125px", right: "40px", borderRadius: "5px" }}>
                        {responseMsg}
                    </div>
                )}
                {showToast && errorMsg && (
                    <div className="toaster text-primary fw-bold d-flex p-2 align-items-center" style={{ top: "125px", right: "40px", borderRadius: "5px" }}>
                        {errorMsg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Student;