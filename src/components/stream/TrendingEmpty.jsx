import React from "react";
import { Link } from "react-router-dom"
import Trend1 from "../../assets/trend-1.png";
import Trend2 from "../../assets/trend-2.png";
import Trend3 from "../../assets/trend-3.png";
import Trend4 from "../../assets/trend-4.png";
import TrendingCard from "./TrendingCard";
import { Grid, Container} from "@material-ui/core";

const TrendingEmpty = ({ title }) => {
  return (
    <>
      <Container maxWidth="xl" className="flexiSpace" style={{backgroundColor: 'black', padding: '20px', paddingLeft: "7%", paddingRight: "7%",opacity:"0%"}}>
      <div className='heading flexMovieHeader'>
            <h1 style={{color: 'orange'}}>{title}</h1>
            
            <Link to='/'><h1 style={{color: 'white'}}>View All</h1></Link>
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

export default TrendingEmpty;
