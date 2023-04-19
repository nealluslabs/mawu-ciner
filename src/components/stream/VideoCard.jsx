import React,{useEffect,useState,useRef} from 'react'
import { findDOMNode } from 'react-dom'
import {
  Grid,
  Container,
  LinearProgress,
  Box,
} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { fetchGroups, fetchMyGroups, uploadGroupImage,fetchMovieData,removeFromUserPlaylist,addToUserPlaylist} from '../../redux/actions/group.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/actions/auth.action';

import ReactPlayer from 'react-player'
import ReactModal from 'react-modal'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const VideoCard = ( { movie }) => {
const dispatch =useDispatch()
const { user } = useSelector((state) => state.auth);

console.log("i am in the video card, the movie is",movie)


const [added,setAdded] = useState(false)
const [videoTime,setVideoTime] = useState(false)
const [thumbnail,setThumbnail] = useState(movie.imageUrl)
const [fullScreen, setFullScreen] = useState(false);
const [screenTest, setScreenTest] = useState(false);
const handle = useFullScreenHandle();


const videoRef = useRef()

const handleEsc = (event) => {
    setFullScreen(!fullScreen)
  
    console.log("full screen is",fullScreen)

 /* if(fullScreen){
    setVideoTime(true)
  }else if (!fullScreen){
    setVideoTime(false)
    setThumbnail(cover)
  }*/
 

};

window.addEventListener('fullscreenchange', handleEsc);

const doVideoActions = () => {
  setVideoTime(!videoTime)
 
  if(!videoTime) 
  {setThumbnail(false)
  }else{setThumbnail(movie.imageUrl)}

  
   if(!videoTime){
   findDOMNode(videoRef.current).requestFullscreen()
   }
}

useEffect(()=>{
  
  dispatch(fetchUserData(user.uid))
 /*may want ot pass it into global reload not local , when movie is added to playlist*/
 //movie in redux, where exactly do i store 1 movie and not a movies array
},[added])

/*useEffect(()=>{
fetchMovieData(movieId)
console.log("i have fetched the movie and is",movie)
},[])*/

useEffect(()=>{
 
  setScreenTest(!screenTest)

if(fullScreen === screenTest){
  
  if(fullScreen){
    setVideoTime(true)
  }else if (!fullScreen){
    setVideoTime(false)
    setThumbnail(movie.imageUrl)
  }
}

},[fullScreen])
 
useEffect(()=>{

  if(user)
 { if(user.watchList.includes(movie.id)){
    console.log("THIs MOVIE IS IN PLAYLIST",movie.id)
    setAdded(true)
  }}

},[])

const removeMovie = (userId,movieName) =>{
  dispatch(removeFromUserPlaylist(userId,movieName/*,setAdded*/))
   
  setAdded(false)
 //we cant exactly setAdded until we confirm that the item 
 //has been removed from the playlist, but I trigger it for now
}
 

 //console.log("THIS IS THE LOGGED IN USER INFO",user)

  return (
    <>
       <Grid item xs={12} md={8} lg={6}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                // height: 200,
                border: "0px solid red",
              }}
            >
            {/*videoTime && 
             <div style={{position:"relative",top:"-20px"}}>
            <video width="750" height="480"  autoplay="autoplay" controls>
               <source src="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/DarkKnight.mp4" 
               type="video/mp4"/>
            </video> 
             </div>
            */}


               {
                 
                <ReactPlayer   
                width="100%"
                 id="full-screenVideo"                                           
                className="videoFrame"
                url={movie.url}
                light={thumbnail}
                playing={videoTime}
                playIcon={' '}
                controls
                ref={videoRef}
                 
              />
              
              }

              {/*!videoTime && <img src={cover} style={{ width: "100%"}} />*/}

              <p style={{fontSize: "20px", marginBottom: "10px", color: 'white'}}>{movie.title}</p>
              { <LinearProgress
                variant="determinate"
                value={50}
                // color="primary"
                style={{color: "#BC4705", backgroundColor: '#676767'}}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: (theme) =>
                    '#676767',
                    "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    bgcolor: "#BC4705",
                    },
                }}
                />}
                <div onClick={()=>{doVideoActions()}} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                { videoTime? <StopIcon style={{ fontSize: '24px', color: '#BC4705' }} />
                :
                <PlayArrowIcon style={{ fontSize: '24px', color: '#BC4705' }} />
                 }
                <p style={{ fontSize: '20px', color: '#BC4705', marginLeft: '10px',pointer:"cursor"  }}>{!videoTime?"PLAY":"STOP"}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                {!added?<AddIcon style={{ fontSize: '24px', color: '#BC4705' }} />
                :
                <RemoveIcon style={{ fontSize: '24px', color: '#BC4705' }} />}
               
                <p onClick ={added?()=>{removeMovie(user.uid,movie.id/*,setAdded*/)}:()=>{dispatch(addToUserPlaylist(user.uid,movie.id/*,setAdded*/));setAdded(true)}}
                 style={{ fontSize: '20px', color: '#BC4705', marginLeft: '10px',pointer:"none" }}>
                
                 {added === true ? "Remove from Watch list": "Add to Watch List"}
                </p>
                </div>

            </Box>
          </Grid>
  </>
  )
}

export default VideoCard