import React,{useState,useEffect,useRef} from "react";
import { findDOMNode } from 'react-dom'
import { Grid, Container, LinearProgress, Box } from "@material-ui/core";
import { fetchGroups, fetchMyGroups, uploadGroupImage,fetchMovieData,removeFromUserPlaylist,addToUserPlaylist} from '../../redux/actions/group.action';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import ReactPlayer from 'react-player'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/actions/auth.action';

const TrendingCard = ({ name, cover ,url}) => {
  const [videoTime,setVideoTime] = useState(false)
const [thumbnail,setThumbnail] = useState(cover)
const [fullScreen, setFullScreen] = useState(false);
const [screenTest, setScreenTest] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [added,setAdded] = useState(false)
const [movie,setMovie] = useState({id:"ZoHXkXrYX7B9HDowPYKg"})
const videoRef = useRef()

const dispatch =useDispatch()
const { user } = useSelector((state) => state.auth);







/*const toggleFullScreen = () => {
  var el = document.getElementById("full-screenVideo");
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
};*/

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
  if(thumbnail === cover) 
  {setThumbnail(false)
  }else{setThumbnail(cover)}


   setVideoTime(!videoTime)
  
   if(!videoTime){
    findDOMNode(videoRef.current).requestFullscreen()
    }
}


useEffect(()=>{
  
  dispatch(fetchUserData(user.uid))

},[added])




useEffect(()=>{
 
  setScreenTest(!screenTest)

if(fullScreen === screenTest){
  
  if(fullScreen){
    setVideoTime(true)
  }else if (!fullScreen){
    setVideoTime(false)
    setThumbnail(cover)
  }
}

},[fullScreen])

useEffect(()=>{

  if(name === "Beast"){setMovie({id:'6yUCwo7OH4R6ug078L7I'})}
  if(name === "Avatar"){setMovie({id:'BrgNJO2W16l3b68e2Xx6'})}
  if(name === "Thor"){setMovie({id:'DemImoDAMHjYzhDE8YOG'})}
  if(name === "Vikram"){setMovie({id:'G1LSokfNCghGx7EeKlL7'})}
  
  if(name === "Eternals"){setMovie({id:'K5Y8ErlaT8F0ezQS2Xn5'})}
  if(name === "AI"){setMovie({id:'QKsBZIkwvcLJiRJKLQ0g'})}
  if(name === "Smile"){setMovie({id:'ZgbHCkWKJavRvOsgYgft'})}
  if(name === "Good Life"){setMovie({id:'ZoHXkXrYX7B9HDowPYKg'})}
  if(name === "Tron Legacy"){setMovie({id:'frWrvaxsqJpW0xMsMZ3g'})}
  if(name === "Nope"){setMovie({id:'kCZlGT6CS1ykxaRnEEtw7'})}
  if(name === "Spectre"){setMovie({id:'maUSeXr6K0u56Yqk0eLs'})}
  if(name === "The Dark Knight Rises"){setMovie({id:'v9vS3GTnYnyCLdUJa57Q'})}
  if(name === "Fast and Furious"){setMovie({id:'wwwoExdFhfFFxsbYzm4l'})}
  if(name === "Dune"){setMovie({id:'x9CPjVrlNIctaXcGQtnF'})}



},[added])




useEffect(()=>{


console.log("movie id is now",movie.id)


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

  return (
    <>
      <Grid
        item
        xs={3}
        sx={{ height: 500, width: 600 }}
        style={{ border: "0px solid green", maxHeight: 350, }}
      >
        {
          <ReactPlayer   
                width="70%"
                id="full-screenVideo"                                              
                className="videoFrame"
                url={url}
                light={thumbnail}
                playing={videoTime}
                playIcon={' '}
                controls
                ref={videoRef}
              
               
  />
 
  }
        {/*<img src={cover} style={{ width: "100%", height: "100%" }} />*/}
        <p style={{ fontSize: "20px", color: 'white' }}>{name}</p>
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
      </Grid>
    </>
  );
};

export default TrendingCard;
