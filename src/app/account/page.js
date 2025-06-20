'use client';
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Search from "../search/page";
import Searchcard from "../Searchcard";
import Link from "next/link";


export default function Account() {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  const [watchdata,setwatchdata] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    async function fetchWatchlist() {
      if (email) {
        try {
          const response = await axios.get(`https://upnextbackend.up.railway.app/get-watchlist?email=${email}`);
          console.log(response.data);
          setwatchdata(response.data.watchlist || []);
        } catch (err) {
          console.error("Failed to fetch watchlist:", err);
        }
      }
    }

    fetchWatchlist();
  }, [email]);

async function handleSubmit() {
    const em = document.getElementById('em').value;
    const pwd = document.getElementById('pwd').value;

    try {
      let response = await axios.post('/api/users/login', {
        email: em,
        password: pwd
      });

      const data = response.data;

      console.log(data);

      if (data.message === "Logged-IN") {
        localStorage.setItem("userEmail", data.email || em); 
        setEmail(data.email || em); 
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed due to server error.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("userEmail");
    setEmail(null);
  }

  function showpwd(){
    let pw = document.getElementById('pwd');
    let btn = document.getElementById('imgs');
      if (pw.type === 'password') {
        pw.type = 'text'; 
        btn.src = '/assets/Images/hide.svg'; 
      } else {
        pw.type = 'password';
        btn.src = '/assets/Images/show.svg'; 
      }
  }

  return (
    <>
      {!email ? (
        <div>
          <Sidebar />
          <div id='boxl'>
            <div id='loginbox'>
              <h3>Login</h3>
              <input placeholder="Email" spellCheck='false' id='em' autoComplete="off" />
              <input placeholder="Password" type="password" spellCheck='false' id='pwd' />
              <button id='submit' onClick={handleSubmit}>Submit</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div>
                <a href='/'>Forgot Password</a> | <Link href="/createacc" legacyBehavior><a>Create Account</a></Link>
              </div>
            </div>
          </div>
          <button id='sowpwdd' onClick={()=>{showpwd()}}><img src="/assets/Images/show.svg" id='imgs'></img></button>
        </div>
      ) : (
        <div>
          <Sidebar />
          <div id='wmsg'>
            <h2 id='welcomemsg'>Welcome, {email}!</h2>
            <button onClick={handleLogout} id='logout'>Logout</button>
          </div>
          {watchdata?(
            <div id='wlist'>
              <div className="lista">Your List:</div>
              <div className="containerw">
              <Searchcard movielist={watchdata}></Searchcard>
              </div>
            </div>
          ):(
           <div className='loadingimg'>
                <img src="/assets/Images/loading.gif" alt="Loading" />
              </div>
          )}
        </div>
      )}
    </>
  );
}
