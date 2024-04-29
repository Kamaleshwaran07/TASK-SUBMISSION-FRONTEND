import React from 'react';
import heroImage from '/heroImage.png';
import hero2 from '/hero2.jpg';
import hero3 from '/hero3.jpg';
import hero4 from '/hero4.jpg';

import { Link } from 'react-router-dom';
const Home = () => {
    return (
      
            <div className='container-fluid '>

            <div className='d-flex position-relative' style={{height:"90vh"}}>
                <div className='postion-absolute d-flex flex-column' style={{marginTop:"15em", marginLeft:"4em", width:"40%"}}>
                <h5>Welcome to</h5>
                    <h1>Student Task Submission</h1>
                    <h6 className='mt-5 py-5'>Streamline your academic journey with our state-of-the-art task submission system. Designed to simplify the process</h6>
                <Link className='btn border bg-black text-white border-2 w-25' to={'/signup'}>Start submitting</Link>
                </div>
                <div className='position-absolute' style={{marginRight:"5px", right:"2em", marginTop:"5em"}} >
                    <img src={heroImage} alt='heroImage' width={"600em"} className='' style={{}} />
                </div>
            
            </div>
            <section className='p-2 row' style={{marginLeft:"4em"}}>
                <figure className='col-6'>
                    <img srcSet={hero2} alt='hero2' width={"600em"} />
                    <figcaption>
                    Seamless submission experience</figcaption>
                <div className='fw-normal mt-5'>
                    Effortlessly upload assignments, track progress, and stay organized with our comprehensive student task submission platform. Simplify your academic journey and focus on what matters most - your education.
                </div>
                </figure>
                <aside className='col-6'>
                    <h5>
                        Revolutionize your academic experience with personalised review from your real time Mentors working in Top industries
                    </h5>
                    <figure className='mt-5 p-2 pt-5'>
                        <img srcSet={hero3} alt='hero3' width={"600em"} />
                    </figure>
                </aside>
            </section>
            <section className='p-2 row bg-black container-fluid' style={{paddingLeft:"1em"}}>
                <figure className='col-6 ps-5 pt-5'>
                    <img srcSet={hero4} alt='hero2' width={"600em"} />
                   
                  
                </figure>
                <aside className='col-6 py-5'>
                    <h3 className='text-white'>
                        Streamline Your Workflow with <br />Our Task Submission site
                    </h3>
                    <p className='text-secondary mt-5 pt-5' style={{ width: "75%" }}>
                        Experience the Ultimate Task Submission Solution: Our platform is designed to revolutionize the way you manage your academic obligations. Effortlessly submit assignments, track deadlines, and collaborate with peers
                    </p> <p className='text-secondary mt-2' style={{ width: "75%" }}>
                        Unlock the Future of Task Submission: Our comprehensive platform offers unparalleled features to transform your academic journey
                    </p> <p className='text-secondary mt-2' style={{ width: "75%" }}>
                        Elevate Your Academic Performance with Our Cutting-Edge Task Submission Platform. Designed to simplify the submission process
                    </p>
                    <h6 className='text-white fw-bold mt-5'>
                        Simplify Your Academic Journey with Our Task Submission Platform
                    </h6>
                </aside>
            </section>
            </div>
     

       
    );
};

export default Home;