import React, { useState,useEffect } from "react"
import Homes from "../components/home/Homes"
import { latest, recommended, upcome } from "../utils/dummyData"
import { Box } from "@material-ui/core"
import VideoStreams from "../components/stream/VideoStreams"
import TrendingStreams from "../components/stream/TrendingStreams"
import WatchListStreams from "../components/stream/WatchListStreams"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/actions/auth.action';

const HomePage = () => {
  
  const dispatch =useDispatch()

  useEffect(()=>{

    dispatch(fetchUserData(user.uid))
    console.log("the loaded user is!",user)
  
  },[/*i will dispatch something in global state that will make this change  */])
  
  const { user,error,message,isLoading } = useSelector((state) => state.auth);
  console.log("users watchlist is",user.watchList)


  return ( 
    <>
      <Homes />
      <VideoStreams content={user.continueWatching} title='Continue watching'/>
      <br/><br/><br/>
      <TrendingStreams  title='Trending Now'/>
      <br/><br/><br/>
      {user && user.watchList.length && <WatchListStreams content={user.watchList}  title='Watch List'/>}
    </>
  )
}

export default HomePage
