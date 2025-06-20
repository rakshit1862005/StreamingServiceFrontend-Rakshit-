'use client'
import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';


function mute(){
    const v = document.getElementById("vid");
    const vim = document.getElementById("muteimg")
    if(v.muted){
        v.muted=false;
        vim.src="assets/Images/umute.svg"
        v.volume=0.2;
    }
    else{
        v.muted=true;
        vim.src="assets/Images/mute.svg"
    }
}


function watch(data){
    window.alert(`Please Sign In To Watch ${data}`);
}

function Banner({bannerdata,banlogo,banneridx}){
    return(
        <>
        <div className="banner">
        {bannerdata.results[banneridx].backdrop_path?(
        <div>
        <img src={`https://image.tmdb.org/t/p/${'original'}${bannerdata.results[banneridx].backdrop_path}`} id="bannerimg" loading='lazy'></img>
        </div>
        ):(
            <p>Loading</p>
        )}
        <div className="banner_trailer">
            {bannerdata?(
              <div id="player"></div>
            ):(
                <p></p>
            )}
        </div>
        </div>
        <div className='essentials'>
            {}
        {banlogo[0]?(
                <img src={`https://image.tmdb.org/t/p/original/${banlogo[0].file_path}`} className='banlogo' loading='lazy'></img>
            ):(
                <p>Loading</p>
            )}
        {bannerdata?(
                <p className='btext'>{bannerdata.results[banneridx].overview}</p>
            ):(
                <p></p>
            )}
            </div>
            {bannerdata?(
            <div className='watchbutton' onClick={()=>{watch(bannerdata.results[banneridx].title)}}>
                <img src="assets/Images/play.svg"></img>
                Start Watching
                </div>
                ):(
                <div></div>
                )}
                    <button id="but" onClick={mute}><img src="assets/Images/mute.svg" id="muteimg" loading='lazy'></img></button>
            
    </>
    )
}
export default Banner