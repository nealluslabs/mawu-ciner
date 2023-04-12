import React from "react";
import {
  Grid,
  Container,
  LinearProgress,
  Box,
} from "@material-ui/core";
import BGIMG1 from "../../assets/u6.png";
import BGIMG2 from "../../assets/u2.jpg";
import VideoCard from "./VideoCard";

const VideoStreams = ({ title }) => {
  return (
    <>
      <Container maxWidth="xl" style={{padding: '20px', paddingLeft: "7%", paddingRight: "7%"}}>
      <div className='heading flexSB'>
            <h1 style={{color: 'white'}}>{title}</h1>
            {/* <Link to='/'>View All</Link> */}
          </div>
        <Grid container spacing={2}>
          <VideoCard name={"The Return Of King Kong"} cover={BGIMG1}/>
          <VideoCard name={"Shadow - The Rebirth"} cover={BGIMG2}/>
        </Grid>
      </Container>
    </>
  );
};

export default VideoStreams;
