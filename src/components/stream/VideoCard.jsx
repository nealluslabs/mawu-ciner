import React,{useEffect,useState,useRef} from 'react'
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
import { fetchGroups, fetchMyGroups, uploadGroupImage,removeFromUserPlaylist,addToUserPlaylist} from '../../redux/actions/group.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/actions/auth.action';
import ReactPlayer from 'react-player'

const VideoCard = ( { name, cover } ) => {
const dispatch =useDispatch()
const [added,setAdded] = useState(false)
const [videoTime,setVideoTime] = useState(false)
const [thumbnail,setThumbnail] = useState(cover)
const videoRef = useRef()

const doVideoActions = () => {
  if(thumbnail === cover) 
  {setThumbnail(false)
  }else{setThumbnail(cover)}


   setVideoTime(!videoTime)
}

useEffect(()=>{

  dispatch(fetchUserData)

},[added])
 
useEffect(()=>{

  if(user.watchList.includes(name)){
    
    setAdded(true)
  }

},[])

const removeMovie = (userId,movieName) =>{
  dispatch(removeFromUserPlaylist(userId,movieName/*,setAdded*/))
   
  setAdded(false)
 //we cant exactly setAdded until we confirm that the item 
 //has been removed from the playlist, but I trigger it for now
}
 
 
 const { user,error,message,isLoading } = useSelector((state) => state.auth);
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


               {<ReactPlayer   
                width="100%"
                                                             
                className="videoFrame"
                url={"https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/DarkKnight.mp4" }
                light={thumbnail}
                playing={videoTime}
                //ref={videoRef}
                
               
              />}

              {/*!videoTime && <img src={cover} style={{ width: "100%"}} />*/}

              <p style={{fontSize: "20px", marginBottom: "10px", color: 'white'}}>{name}</p>
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
               
                <p onClick ={added?()=>{removeMovie(user.uid,name/*,setAdded*/)}:()=>{dispatch(addToUserPlaylist(user.uid,name/*,setAdded*/));setAdded(true)}}
                 style={{ fontSize: '20px', color: '#BC4705', marginLeft: '10px',pointer:"none" }}>
                
                 {added === true ? "Remove from Watchlist": "Add to Watchlist"}
                </p>
                </div>

            </Box>
          </Grid>
  </>
  )
}

export default VideoCard