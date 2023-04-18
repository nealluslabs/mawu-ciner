import React from "react";
import { Link } from "react-router-dom"
import Trend1 from "../../assets/trend-5.jpg";
import Trend2 from "../../assets/trend-6.jpg";
import Trend3 from "../../assets/trend-7.jpg";
import Trend4 from "../../assets/trend-8.jpg";
import TrendingCard from "./TrendingCard";
import { Grid, Container} from "@material-ui/core";

const TrendingStreams3 = ({ title }) => {
  return (
    <>
      <Container maxWidth="xl" style={{backgroundColor: 'black', padding: '20px', paddingLeft: "7%", paddingRight: "7%"}}>
      <div className='heading flexMovieHeader'>
            <h1 style={{color: 'orange'}}>{title}</h1>
            
            <Link to='#'><h1 style={{color: 'white'}}>View All</h1></Link>
       </div>
       
          <Grid container spacing={2}>
            <TrendingCard name="Tron Legacy" cover={Trend1} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/TRON.mp4"/>
            <TrendingCard name="Dune" cover={Trend2} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Dune.mp4"/>
            <TrendingCard name="Eternals" cover={Trend3} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Eternals.mp4"/>
            <TrendingCard name="Fast and Furious" cover={Trend4} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/F9.mp4"/>
            </Grid>
            <br/><br/><br/><br/><br/><br/><br/>
      </Container>
    </>
  );
};

export default TrendingStreams3;
