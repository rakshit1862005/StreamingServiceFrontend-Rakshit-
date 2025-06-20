'use client'
import React, { useState, useEffect } from "react";
import axios from 'axios';

async function addtowatchlist({movie}){
    const email = localStorage.getItem("userEmail");
    if(!email){
        window.alert('Please Login');
}
    else{
    try {
      const response = await axios.post('https://upnextbackend.up.railway.app/add-to-watchlist', {
        email: email,
        movie: {
            'movie_id':movie.id,
            'title':movie.title||movie.name,
            'backdrop_path':movie.backdrop_path,
            'poster_path':movie.poster_path,
            'overview':movie.overview,
            'media_type':movie.media_type
        }
      });

      alert(response.data.message);

    } catch (error) {
      console.error("Error adding to watchlist:", error);
      window.alert("Something went wrong");
    }
    }
}

function Modal({movie,onClose}){
    const [logo,setlogo] = useState(null);
    async function getlogo(mid) {
        let response = await axios.get(`https://upnextbackend.up.railway.app/getlogo?id=${mid}&type=${movie.media_type||'movie'}`);
        setlogo(response.data);
        console.log(response.data);
    }
    useEffect(()=>{
        getlogo(movie.id);
    },[])
    return(
        <div className="modal">
            <div className="datawin">
                <div className="bdrop">
                    <div id='clogo'>
                        {logo && logo[0]?(
                            <img src={`https://image.tmdb.org/t/p/${'w300'}${logo[0].file_path}`} loading="lazy"></img>
                        ):(
                            <></>
                        )}
                    </div>
                    <div className="butholder">
                    <button id = 'watchtrailer'>Watch Trailer</button>
                    <button id='awatchlist' onClick={()=>{addtowatchlist({movie})}}>+</button>
                    </div>
                <img src={`https://image.tmdb.org/t/p/${'original'}${movie.backdrop_path}`} id='bdim' loading="lazy"></img>
                </div>
                <div className="info">
                <h4>{movie.title || movie.name}</h4>
                <p>{movie.overview}</p>
                </div>
                <button id='close' onClick={onClose} >X</button>
            </div>
        </div>
    )
}

function Card({movielist,title}){
    const [selmov,setmov]=useState(null);
    return (
        <div>
        <div className="main">
            <h1>{title}</h1>
        {movielist?(
        
        <div className="container">
            {movielist.map((movie) => {
                return (
                    
                    <div className="tile" onClick={()=>{setmov(movie)}}>
                        <div className="poster">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} loading="lazy"></img>
                        </div>
                        <div className="title">
                            {movie.title?(
                            <h2>{movie.title}</h2>
                            ):(
                                <h2>{movie.name}</h2>
                            )}
                        </div>
                        <div className="overlayy"></div>
                    </div>
                );
            })}
        </div>):(
            <div></div>
        )}
        </div>
        {selmov?(
            <Modal movie={selmov} onClose={()=>setmov(null)}></Modal>
        ):(
            <></>
        )}
        </div>
    );
}
    
export default Card