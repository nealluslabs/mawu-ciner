import React,{useState} from "react";
import { Grid, Container, LinearProgress, Box } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from "@material-ui/icons/Add";
import ReactPlayer from 'react-player'

const TrendingCard = ({ name, cover }) => {
  const [videoTime,setVideoTime] = useState(false)
const [thumbnail,setThumbnail] = useState(cover)

const doVideoActions = () => {
  if(thumbnail === cover) 
  {setThumbnail(false)
  }else{setThumbnail(cover)}


   setVideoTime(!videoTime)
}

  return (
    <>
      <Grid
        item
        xs={3}
        sx={{ height: 500, width: 600 }}
        style={{ border: "0px solid green", maxHeight: 350, }}
      >
        {<ReactPlayer   
                width="70%"
                                                             
                className="videoFrame"
                url={"https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/DarkKnight.mp4" }
                light={thumbnail}
                playing={videoTime}
                playIcon={' '}
                //ref={videoRef}
                
               
  />}
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
