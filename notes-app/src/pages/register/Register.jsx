import React, { useRef } from 'react'
import assets from '../../assets/index'
import './style.css'
import makeApiRequest from '../../helper/makeApiRequest';
import { setUserToken } from '../../helper/storage/storeUserToken';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navig = useNavigate();
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const errorDiv = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        errorDiv.current.innerHTML = ""
        const response = await makeApiRequest(
            {
                method: 'post',
                url: "https://notes-app-pkip.onrender.com/register",
                body: {
                    email: emailInput.current.value,
                    password: passwordInput.current.value
                }
            }
        )

        if (response.status === 200) {
            setUserToken(response.data.data.token);
            setUserToken(response.data.data.email);

            navig('/');
        }
        else if (response.status >= 400) {
            errorDiv.current.innerHTML = "Invalid credentials";
        }
    }


    return (
        <div className='login-wrapper overflow-hidden position-relative'>
            <img src={assets.loginillustration[0]} alt="illustration" className="position-absolute illustration-dots filter-to-white" />
            <div className="login-background" >
                <div className='login-card d-flex ps-5 flex-column justify-content-center'>
                    <div>
                        <h1 className='m-0 my-3 font-24'>Hi there! New Here??</h1>
                        <h6 className='my-3 text-offwhite fs-6 w-75'>It's a beautiful day to save the planet</h6>
                        <form className='d-flex mt-5 flex-column'>
                            <label htmlFor="email" className=' text-white'>
                                Email</label>
                            <input ref={emailInput} type="text" id='email' className='mt-2' />
                            <label htmlFor="password" className='mt-4 text-white'>
                                Password</label>
                            <input ref={passwordInput} type="password" id='password' className='mt-2' />

                            <div className='d-flex justify-content-between align-items-center mt-2'>
                                <a href="/login" className="text-decoration-none font-12 link-light">Already a user? Login</a>
                                <a href="" className="text-decoration-none font-12 link-light">Forgot Password?</a>
                            </div>


                            <div ref={errorDiv} className='error-container text-danger'>

                            </div>

                            <button onClick={() => handleSubmit(event)} className="btn btn-success mt-2">Submit</button>

                        </form>
                    </div>
                </div>
            </div >
        </div>
    )

}

export default Register