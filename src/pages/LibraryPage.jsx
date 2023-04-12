import React, { useState } from "react"
import Homes from "../components/home/Homes"
import { latest, recommended, upcome } from "../utils/dummyData"
import { Box } from "@material-ui/core"
import VideoStreams from "../components/stream/VideoStreams"
import TrendingStreams from "../components/stream/TrendingStreams"
import LibraryLead from "../components/home/LibraryLead"
import TrendingEmpty from "../components/stream/TrendingEmpty"
import TrendingStreams2 from "../components/stream/TrendingStreams2"
import TrendingStreams3 from "../components/stream/TrendingStreams3"

const LibraryPage = () => {
  return ( 
    <>
      <LibraryLead />
      {/*<VideoStreams title='Continue watching'/>*/}
      <br/><br/><br/>  
      <div >
      <TrendingEmpty  title='Sample' /> {/*please dont delete, i use it for spacing */}
  
      <TrendingStreams2  title='Recently Added' />
      <TrendingStreams  title='Feature Films'/>
      <TrendingStreams3  title='Recommendations'/>
      </div>
    </>
  )
}

export default LibraryPage
