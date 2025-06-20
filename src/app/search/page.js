'use client'
import axios from "axios";
import Sidebar from "../Sidebar";
import Searchcard from "../Searchcard";
import { useEffect, useState } from "react";



async function searching(Keyword1) {
  const response = await axios.get(`https://upnextbackend.up.railway.app/searchkey?keyword=${Keyword1}`)
  let data = await response.data;
  return(data);
}

export default function Search() {

  
  const [searchdata,setdata] = useState(null);
  async function handlesearch(key) {
    const response = await searching(key);
    setdata(response);
  }
  return (
  <div>
    <Sidebar></Sidebar>
      <div id = 'searchbar'>
        <input type="text" spellCheck='false' id="inp" placeholder="Movies, TV-Shows And More" autoComplete="off"></input>
        <button id = 'search' onClick={()=>{
          handlesearch(document.getElementById('inp').value)
        }}>Search</button>
      </div>
      {searchdata?(
        
          <div><Searchcard movielist={searchdata} title={'PLCAEHOLDER'}></Searchcard></div>
      ):(
        <div id = 'searchplaceholder'><p>Your Search Results Will Be Displayed Here</p></div>
      )}
    </div>
  );
}