import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import RefreshToken from '../RefreshToken'

const Layouts = ({children}) => {

  const navigate = useNavigate();
  const {name, loading} = RefreshToken();

   const HandleLogout = async (e) =>{
    e.preventDefault()
      try {
          await axios.delete("https://ap1-backend.herokuapp.com/api/logout");
          navigate("/");
      } catch (error) {
        console.log(error)
      }
   }

  return (
    <React.Fragment>
      {loading ? <div>Loading....</div> : (
        <div>
              <nav className="navbar navbar-expand-lg bg-light">
                  <div className="container">
                    <Link className="navbar-brand" to={'/'}>Dashboard</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link className="navbar-brand" to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="navbar-brand" to={'/'}>About</Link>
                        </li>
                      </ul>
                      <form className="d-flex align-items-center" role="search">
                        <h5 style={{paddingRight:"12px"}}>{name}</h5>
                          <button onClick={HandleLogout} className="btn btn-outline-primary" type="submit">Logout</button>
                      </form>
                    </div>
                  </div>
                </nav>
                <div className='container mt-24'>
                    <main>{children}</main>
                </div>
        </div>
      )
            }
      </React.Fragment>
  )
}

export default Layouts