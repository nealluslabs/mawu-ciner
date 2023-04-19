import React,{useEffect} from "react";
import {
  Grid,
  Container,
  LinearProgress,
  Box,
} from "@material-ui/core";
import BGIMG1 from "../../assets/u6.png";
import BGIMG2 from "../../assets/u2.jpg";
import VideoCard from "./VideoCard";
import {fetchMovieData} from '../../redux/actions/group.action';
import { useDispatch, useSelector } from 'react-redux';


const VideoStreams = ({ content,title }) => {

/*dispatch the movies on use effect */
//use movie ids
const dispatch = useDispatch()
const { movie } = useSelector((state) => state.group);
const {user} = useSelector((state)=> state.auth)




useEffect(()=>{
 
    dispatch(fetchMovieData(content))
    //console.log("movie is now",movie)
   
   

},[])


  return (
    <>
      <Container maxWidth="xl" style={{padding: '20px', paddingLeft: "7%", paddingRight: "7%"}}>
      <div className='heading flexSB'>
            <h1 style={{color: 'white',pointer:"cursor"}} >{title}</h1>
            {/* <Link to='/'>View All</Link> */}
            {/*<button onClick={dispatch(fetchMovieData(content[0]))}>click me</button>*/}
          </div>
        <Grid container spacing={2}>

       {movie.length && movie.map(function(item,i){
        
          return (
         <VideoCard movie={movie[i]} name={"The Return Of King-Kong"} cover={BGIMG1}/>
          )}
        )
         
      }

         {/*<VideoCard name={"The Return Of King Kong"} cover={BGIMG1}/>
         <VideoCard name={"Shadow - The Rebirth"} cover={BGIMG2}/> */}

        </Grid>
      </Container>
    </>
  );
};

export default VideoStreams;
