import React, { useEffect, useState } from 'react'
import './loginstyle.css'
import google from './logos/google.png'
import apple from './logos/apple.png'
import { useNavigate } from 'react-router-dom'

// ################################# firebase
import { app } from '../../Firebase'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



const auth = getAuth(app)
// ################################# firebase


import { toast } from 'react-toastify';

const Login = () => {


  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const login = () => {
    console.log(email, password)
    if (email == "" || password == "") {
      toast.success("fild is empty")
    }
    else {
      signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value)
        toast.success("Login Sucessful")
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        toast.error("User not Found")
      }
      )
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //setUser(currentUser);
      if (currentUser) {
        console.log("User Name:", currentUser.displayName);
      }
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);


  return (
    <>

      <div className="login_form m-auto mt-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Log In</h3>

          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Password</label>
              <a href="#">Forgot Password?</a>
            </div>

            <input type="password" id="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" onClick={login}>Log In</button>

          <p className="separator">
            <span>or</span>
          </p>


          <div className="login_option">
            <div className="option">
              <a href="#">
                <img src={google} alt="Google" />
                <span>Google</span>
              </a>
            </div>

            <div className="option">
              <a href="#">
                <img src={apple} alt="Apple" />
                <span>Apple</span>
              </a>
            </div>
          </div>

          <p className="sign_up">Don't have an account? <a onClick={() => navigate("/signup")}>Sign up</a></p>
        </form>
      </div>
    </>
  )
}

export default Login
