import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handlerLogin = async (e) => {
        setLoading(true);
        e.preventDefault()
        try {

            await axios.post("https://ap1-backend.herokuapp.com/api/login", {
                email,
                password
            }).then(() => {
                setLoading(false);
                navigate("/dashboard")
             });
                        
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.message);
                setLoading(false);
            }
        }
     }

  return (
        <div className='container' style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <div className="d-flex align-items-center justify-content-center">
                <div>
                { msg.length > 0 ? (<div className="alert alert-danger" role="alert">{msg}</div>) : ''}
                    <form onSubmit={handlerLogin} className='d-flex flex-column bd-highlight mb-3'>
                    <div className='email bd-highlight'>
                        <label className="form-label">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-lg" placeholder='example@gmail.com' />
                    </div>
                    <div className='password bd-highlight'>
                        <label className="form-label">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='***************' className="form-control form-control-lg" aria-describedby="passwordHelpBlock"/>
                    </div>
                    <button type='sbumit' className='btn btn-primary bd-highlight mt-2'>
                    { loading ? <div>Loading...</div> : <div>submit</div>}
                    </button>
                </form>
                <p>if you don't have a account? <Link to='/register' >Register</Link> .</p>
                </div>
            </div>
        </div>
  )
}

export default Login