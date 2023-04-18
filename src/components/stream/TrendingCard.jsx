import React,{useState,useRef} from "react";
import { findDOMNode } from 'react-dom'
import { Grid, Container, LinearProgress, Box } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from "@material-ui/icons/Add";
import ReactPlayer from 'react-player'
import ReactModal from 'react-modal'

const TrendingCard = ({ name, cover ,url}) => {
  const [videoTime,setVideoTime] = useState(false)
const [thumbnail,setThumbnail] = useState(cover)
const [isOpen, setIsOpen] = useState(false);

const videoRef = useRef()

const toggleFullScreen = () => {
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
};


const doVideoActions = () => {
  if(thumbnail === cover) 
  {setThumbnail(false)
  }else{setThumbnail(cover)}


   setVideoTime(!videoTime)
  
   if(!videoTime){
    findDOMNode(videoRef.current).requestFullscreen()
    }
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
                url={url }
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
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <AddIcon style={{ fontSize: "24px", color: "#BC4705" }} />
          <p style={{ fontSize: "20px", color: "#BC4705", marginLeft: "10px" }}>
            Add to playlist
          </p>
        </div>
      </Grid>
    </>
  );
};

export default TrendingCard;
