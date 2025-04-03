import React, { useState } from 'react'
import './Singstyle.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// #################### firebse
import { app } from '../../Firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
// #################### firebse



const Singup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpass, setConfpass] = useState("");

  const singup = async () => {
    console.log(name, email, password, confpass);
    if (name == "" || email == "" || password == "" || confpass == "") {
      console.log("all fild is complsory");

    }
    else if (password != confpass) {
      console.log("password is does't match");
    }
    else {
      console.log("sucess");
      // await createUserWithEmailAndPassword(auth, email, password).then((value) => console.log(value))

      try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set displayName
        await updateProfile(user, {
          displayName: name
        });

        try {
          await setDoc(doc(db, "user", email), 
          {
            cart: "asda"
          },{ merge: true } 
        
        )
        } catch (error) {
          console.error("Error uploading user:", error);
        }

        console.log("User Registered:", user);
        console.log("Display Name Set:", user.displayName);
        toast.success("Ragister Successfull")
        // Redirect after successful signup
         navigate("/login");  // Change route as needed

      } catch (error) {
        console.error("Signup Error:", error.message);
        toast.error("Something went Wrong")
      }

    }
  }




  return (
    <>

      <div className="login_form m-auto mt-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Ragister</h3>

          <div className="input_box">
            <label>Name</label>
            <input type="text" id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Password</label>
            </div>

            <input type="password" id="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Confirm Password</label>
            </div>

            <input type="password" id="password1" placeholder="Enter your password" required onChange={(e) => setConfpass(e.target.value)} />
          </div>

          <button type="submit" onClick={singup}>Sign Up</button>


          <p className="sign_up">Already have an account? <a onClick={() => navigate("/login")}>Log in</a></p>
        </form>
      </div>
    </>
  )
}

export default Singup
