'use client';
import { useState } from "react";
import Sidebar from "../Sidebar";
import Link from "next/link";
import axios from "axios";

export default function Createacc() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit() {
    const em = document.getElementById('em').value;
    const pwd = document.getElementById('pwd').value;
    const confirmpwd = document.getElementById('confirmpwd').value;

    if (pwd !== confirmpwd) {
      setError("Passwords do not match.");
      setSuccess(null);
      return;
    }

    try {
      let response = await axios.post('/api/users/signup', {
        email: em,
        password: pwd
      });

      const data = response.data;
      console.log(data);

      if (data.message === "User registered") {
        localStorage.setItem("userEmail", data.email || em);
        setSuccess("Account created successfully! You can now log in.");
        setError(null);
      } else {
        setError(data.message);
        setSuccess(null);
      }
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed due to server error.");
      setSuccess(null);
    }
  }
  function showpwd(){
    let pw = document.getElementById('pwd');
    let cpw = document.getElementById('confirmpwd');
    let btn = document.getElementById('imgs');
      if (pw.type === 'password') {
        pw.type = 'text'; 
        cpw.type = 'text'; 
        btn.src = '/assets/Images/hide.svg'; 
      } else {
        pw.type = 'password';
        cpw.type = 'password'; 
        btn.src = '/assets/Images/show.svg'; 
      }
  }
  return (
    <div>
      <Sidebar />
      <div id='boxl'>
        <div id='loginbox'>
          <h3>Create An Account</h3>

          <input placeholder="Email" spellCheck='false' id='em' autoComplete="off" />

          <input placeholder="Password" type="password" spellCheck='false' id='pwd'/>
          <input placeholder="Confirm Password" type="password" spellCheck='false' id='confirmpwd' />

          <button id='submit' onClick={handleSubmit}>Register</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <div>
            <a href='/'>Forgot Password</a> |{" "}
            <Link href="/account" legacyBehavior>
              <a>Login To Existing Account</a>
            </Link>
          </div>
          
        </div>
        
      </div>
      <button id='sowpwd' onClick={()=>{showpwd()}}><img src="/assets/Images/show.svg" id='imgs'></img></button>
    </div>
  );
}
