import React from "react";
import { Link } from "react-router-dom"
import Trend1 from "../../assets/trend-1.png";
import Trend2 from "../../assets/trend-2.png";
import Trend3 from "../../assets/trend-3.png";
import Trend4 from "../../assets/trend-4.png";
import TrendingCard from "./TrendingCard";
import { Grid, Container} from "@material-ui/core";

const TrendingStreams = ({ title }) => {
  return (
    <>
      <Container maxWidth="xl" style={{backgroundColor: 'black', padding: '20px', paddingLeft: "7%", paddingRight: "7%"}}>
      <div className='heading flexSB'>
            <h1 style={{color: 'white'}}>{title}</h1>
            <Link to='/'>View All</Link>
          </div>
          <Grid container spacing={2}>
            <TrendingCard name="Avatar" cover={Trend1}/>
            <TrendingCard name="Shazam" cover={Trend2}/>
            <TrendingCard name="Spiderhead" cover={Trend3}/>
            <TrendingCard name="Cowboy aliens" cover={Trend4}/>
            </Grid>
            <br/><br/><br/><br/><br/><br/><br/>
      </Container>
    </>
  );
};

export default TrendingStreams;
