import React, { useState } from "react"
import Homes from "../components/home/Homes"
import { latest, recommended, upcome } from "../utils/dummyData"
import { Box } from "@material-ui/core"
import VideoStreams from "../components/stream/VideoStreams"
import TrendingStreams from "../components/stream/TrendingStreams"

const HomePage = () => {
  return ( 
    <>
      <Homes />
      <VideoStreams title='Continue watching'/>
      <br/><br/><br/>
      <TrendingStreams  title='Trending Now'/>
      <br/><br/><br/>
      <TrendingStreams  title='Watch List'/>
    </>
  )
}

export default HomePage
