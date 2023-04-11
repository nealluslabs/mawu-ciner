import React from "react";
import { Grid, Container, LinearProgress, Box } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";

const TrendingCard = ({ name, cover }) => {
  return (
    <>
      <Grid
        item
        xs={3}
        sx={{ height: 500, width: 600 }}
        style={{ border: "0px solid green", maxHeight: 350, }}
      >
        <img src={cover} style={{ width: "100%", height: "100%" }} />
        <p style={{ fontSize: "20px", color: 'white' }}>{name}</p>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <PlayArrowIcon style={{ fontSize: "24px", color: "#BC4705" }} />
          <p style={{ fontSize: "20px", color: "#BC4705", marginLeft: "10px" }}>
            PLAY
          </p>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <AddIcon style={{ fontSize: "24px", color: "#BC4705" }} />
          <p style={{ fontSize: "20px", color: "#BC4705", marginLeft: "10px" }}>
            Add to playlist
          </p>
        </div>
      </Grid>
    </>
  );
};

export default TrendingCard;
