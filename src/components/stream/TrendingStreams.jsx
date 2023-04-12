import React from "react";
import { Link } from "react-router-dom"
import Trend1 from "../../assets/trend-1.jpeg";
import Trend2 from "../../assets/trend-2.jpg";
import Trend3 from "../../assets/trend-3.jpg";
import Trend4 from "../../assets/trend-4.jpg";
import TrendingCard from "./TrendingCard";
import { Grid, Container} from "@material-ui/core";

const TrendingStreams = ({ title }) => {
  return (
    <>
      <Container maxWidth="xl" style={{backgroundColor: 'black', padding: '20px', paddingLeft: "7%", paddingRight: "7%"}}>
      <div className='heading flexMovieHeader'>
            <h1 style={{color: 'orange'}}>{title}</h1>
            
            <Link to='/'><h1 style={{color: 'white'}}>View All</h1></Link>
       </div>
       
          <Grid container spacing={2}>
            <TrendingCard name="Avatar" cover={Trend1}/>
            <TrendingCard name="Thor" cover={Trend2}/>
            <TrendingCard name="Beast" cover={Trend3}/>
            <TrendingCard name="Vikram" cover={Trend4}/>
            </Grid>
            <br/><br/><br/><br/><br/><br/><br/>
      </Container>
    </>
  );
};

export default TrendingStreams;
