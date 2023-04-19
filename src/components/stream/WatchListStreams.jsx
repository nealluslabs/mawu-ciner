import React,{useEffect} from "react";
import { Link } from "react-router-dom"
import Trend1 from "../../assets/trend-1.jpeg";
import Trend2 from "../../assets/trend-2.jpg";
import Trend3 from "../../assets/trend-3.jpg";
import Trend4 from "../../assets/trend-4.jpg";
import WatchListCard from "./WatchListCard";
import { Grid, Container} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import {fetchWatchListData} from '../../redux/actions/group.action';

const WatchListStreams = ({ content,title }) => {

  const dispatch = useDispatch()
const { watchlist,playlistUpdate,movie} = useSelector((state) => state.group);
const {user} = useSelector((state)=> state.auth)
console.log("watch list data is",watchlist)





useEffect(()=>{
    
  dispatch(fetchWatchListData(content))
    
  console.log("content is",content)
    console.log("watch list data is",watchlist)


},[playlistUpdate])


  return (
    <>
      <Container maxWidth="xl" style={{backgroundColor: 'black', padding: '20px', paddingLeft: "7%", paddingRight: "7%"}}>
      <div className='heading flexMovieHeader'>
            <h1 style={{color: 'orange'}}>{title}</h1>
            
            <Link to='#'><h1 style={{color: 'white'}}>View All</h1></Link>
       </div>
       
          <Grid container spacing={2}>
           {/*
            <WatchListCard name="Avatar" cover={Trend1} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Avatar.mp4"/>
            <WatchListCard name="Thor" cover={Trend2} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Thor.mp4"/>
            <WatchListCard name="Beast" cover={Trend3} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Beast.mp4"/>
            <WatchListCard name="Vikram" cover={Trend4}url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Spectre.mp4"/>
               */}

         {watchlist && watchlist.length && watchlist.map(function(item,i){ 
          console.log(watchlist)
        return(
        <WatchListCard name={watchlist[i].title} cover={watchlist[i].imageUrl} url={watchlist[i].url}/>  
        )
    }) }
            </Grid>
            <br/><br/><br/><br/><br/><br/><br/>
      </Container>
    </>
  );
};

export default WatchListStreams;
