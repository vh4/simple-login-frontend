import React from 'react'
import { useState } from 'react';
import {useNavigate, Link } from "react-router-dom"
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register =  () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [emailVal, setEmailVal] = useState("");
    const [nameVal, setNameVal] = useState("");

    const submitHandler = async (e) =>{
        e.preventDefault();
        
        try {

            if(validator.isEmpty(name)){ return setNameVal("nama harus diisi");}
            if(validator.isEmpty(email)){ return setEmailVal("email harus diisi");}

            await axios.post("http://localhost:5000/api/users", {
                name,
                email,
                password,
                confirmPassword
            });

            navigate("/");
            toast.success('Registered has been succesfully!');

        } catch (error) {
            if(error.response){
                setMsg(error.response.data.message);
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

                        <form onSubmit={submitHandler} className='d-flex flex-column bd-highlight mb-3'>
                        <div className='password bd-highlight mt-2'>
                            <label className="form-label">Name</label>
                            <div style={{color:"red"}}>{nameVal}</div>
                            <input type="text" placeholder='Toe Barrei' value={name} onChange={(e) => setName(e.target.value)} className={`form-control form-control-lg ${nameVal ? "border-danger": ""}`} />
                            <div className="form-text">please fill your name!</div>
                        </div>
                        <div className='email bd-highlight'>
                            <label className="form-label">Email</label>
                            <div style={{color:"red"}} >{emailVal}</div>
                            <input type="email" className={`form-control form-control-lg ${emailVal ? "border-danger": ""}`}  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com' />
                            <div className="form-text">please fill email like example@gmail.com</div>
                        </div>
                        <div className='password bd-highlight mt-2'>
                            <label className="form-label">Password</label>
                            <input type="password" placeholder='***************'  value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg"/>
                            <div className="form-text">please fill password in range 8-16, use letters</div>
                        </div>
                        <div className='password bd-highlight mt-2'>
                            <label className="form-label">Password Confirm</label>
                            <input type="password" placeholder='***************'  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control form-control-lg"/>
                            <div className="form-text">please fill password in range 8-16, use letters</div>
                        </div>
                        <button type='submit' className='btn btn-primary bd-highlight mt-2'>
                            Submit
                        </button>
                        <div className='form-text text-end'><Link to="/">back to login! </Link></div>
                    </form>
                    </div>
                </div>
            </div>
    )
}

export default Register