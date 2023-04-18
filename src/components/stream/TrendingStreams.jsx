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
            
            <Link to='#'><h1 style={{color: 'white'}}>View All</h1></Link>
       </div>
       
          <Grid container spacing={2}>
            <TrendingCard name="Avatar" cover={Trend1} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Avatar.mp4"/>
            <TrendingCard name="Thor" cover={Trend2} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Thor.mp4"/>
            <TrendingCard name="Beast" cover={Trend3} url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Beast.mp4"/>
            <TrendingCard name="Vikram" cover={Trend4}url="https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Spectre.mp4"/>


            {/*content.map(function(item){ 
        
        return(
        <TrendingCard name={item.title} cover={item.imageUrl} url={item.url"https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Avatar.mp4"}/>  
        )
    }) */}
            </Grid>
            <br/><br/><br/><br/><br/><br/><br/>
      </Container>
    </>
  );
};

export default TrendingStreams;
