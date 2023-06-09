import React from "react";
import { Link } from "react-router-dom"
import Trend1 from "../../assets/trend-9.png";
import Trend2 from "../../assets/trend-10.jpg";
import Trend3 from "../../assets/trend-11.jpg";
import Trend4 from "../../assets/trend-12.jpg";
import TrendingCard from "./TrendingCard";
import { Grid, Container} from "@material-ui/core";

const TrendingStreams2 = ({ title }) => {
  return (
    <>
      <Container maxWidth="xl" style={{backgroundColor: 'black', padding: '20px', paddingLeft: "7%", paddingRight: "7%"}}>
      <div className='heading flexMovieHeader'>
            <h1 style={{color: 'orange'}}>{title}</h1>
            
            <Link to='#'><h1 style={{color: 'white'}}>View All</h1></Link>
       </div>
       
          <Grid container spacing={2}>
            <TrendingCard name="Good Life" cover={Trend1} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/GoodLife.mp4"/>
            <TrendingCard name="Nope" cover={Trend2} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Nope.mp4"/>
            <TrendingCard name="Smile" cover={Trend3} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Smile.mp4"/>
            <TrendingCard name="Spectre" cover={Trend4} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Spectre.mp4"/>
            </Grid>
            <br/><br/><br/><br/><br/><br/><br/>
      </Container>
    </>
  );
};

export default TrendingStreams2;
