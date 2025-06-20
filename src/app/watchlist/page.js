'use client';
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Searchcard from "../Searchcard"; 

export default function Watchlist() {
  const [email, setEmail] = useState(null);
  const [watchdata, setwatchdata] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userEmail')) {
      setEmail(localStorage.getItem('userEmail'));
    } else {
      setEmail('none');
    }
  }, []);

  useEffect(() => {
    async function fetchWatchlist() {
      if (email && email !== 'none') {
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

  return (
    <div>
      <Sidebar />
      {!email ? (
            <div>
              <div className="lista">Please Login To See Your List!!</div>
            </div>
      ) : (
        <div>
          {email === 'none' ? (
            <div>
              <div className="lista">Please Login To See Your List!!</div>
            </div>
          ) : (
            <div>
              {watchdata && watchdata.length > 0 ? (
                <div id='wlist'>
                  <div className="lista">Your List:</div>
                  <div className="containerw">
                    <Searchcard movielist={watchdata} />
                  </div>
                </div>
              ) : (
              <div className='loadingimg'>
                <img src="/assets/Images/loading.gif" alt="Loading" />
              </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
