import React , {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate() 
  const [isLoading, setIsLoading] = useState(false);

  // Handling Logout function
  const handleLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigate("/login"); // Redirect to Login after 3 seconds
      
    }, 3000)
    
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setTimeout(() => {
      
      window.location.reload();
    }, 3000)
    return (
      <div
        className=""
        style={{
          marginLeft: "45%",
          paddingBottom: "9rem",
          marginTop: "20rem",
          backgroundColor: "white",
          height: "50em",
          width: "50vw",
          overflowY: "hidden",
        }}
      >
        <div className="loginLoader">
          <div className="half"></div>
          <div className="half"></div>
        </div>
        <br />
        <h3 className="text-primary d-block fs-4">Logging you out</h3>
      </div>
    );
  }

  return (
    <div>
      
      
    { isLoading && (
        <div
          className=""
          style={{ marginLeft: "45%", paddingBottom: "9rem", marginTop: "20rem", backgroundColor: "white", height: "50em", width: "50vw", overflowY: "hidden" }}
        >
          <div className="loginLoader">
            <div className="half"></div>
            <div className="half"></div>
          </div>
          <br />
          {/* <h3 className="text-primary d-block fs-4">Logging you out</h3> */}
        </div>
      )}
      {
        !isLoading && (
          <div className="navbar d-flex flex-row border-bottom border-3">
            <div className="container-fluid ">
              <h3 className="navbar-brand fs-4">Task Submission</h3>
              <div>

                <ul className="navbar-nav me-auto flex-row align-items-center fs-5">
                  <li className="nav-item">

                    <Link className="nav-link me-2 active outfit" to={"/"} onClick={() => {
                      setIsLoading(true)
                      setTimeout(() => {
                        setIsLoading(false)
                      },1000)
                    }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="mb-1 me-1"
                        width={'25px'}
                      >
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>
                      Home
                    </Link>
                  </li>
                  
                  {
                    isAuthenticated ? <>
                      <Link className="nav-link bg-black text-white Login rounded-3 outfit px-2" to={"/dashboard"}>
                        Dashboard


                      </Link>
                      <button className="btn mr-4 d-flex fw-bold fs-5" onClick={handleLogout}>Logout <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mt-1" width={'25px'}>
                        <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                      </svg>
                      </button>
                     
                    </>
                      :
                      <div className="d-flex">

                      <Link className="nav-link bg-black text-white Login rounded-start-3 outfit px-2" to={"/login"}>
                        Login
                       

                        </Link>
                        <Link className="nav-link bg-black text-white signup rounded-end-3 px-2 outfit me-2" to={"/signup"}>
                          Signup


                        </Link>
                      </div>
                  }
                 

                </ul>
              </div>
            </div>
          </div>
        )
    }
   
  </div>
  );
};

export default NavBar;
