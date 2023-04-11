import React from 'react'
import {
  Grid,
  Container,
  LinearProgress,
  Box,
} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';

const VideoCard = ( { name, cover } ) => {
  return (
    <>
       <Grid item xs={12} md={8} lg={6}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
                border: "1px solid black",
              }}
            >
              <img src={cover} style={{ width: "100%"}} />
              <p style={{fontSize: "20px", marginBottom: "10px", color: 'white'}}>{name}</p>
              <LinearProgress
                variant="determinate"
                value={50}
                // color="primary"
                style={{color: "#BC4705", backgroundColor: '#676767'}}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: (theme) =>
                    '#676767',
                    "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    bgcolor: "#BC4705",
                    },
                }}
                />
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <PlayArrowIcon style={{ fontSize: '24px', color: '#BC4705' }} />
                <p style={{ fontSize: '20px', color: '#BC4705', marginLeft: '10px' }}>PLAY</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AddIcon style={{ fontSize: '24px', color: '#BC4705' }} />
                <p style={{ fontSize: '20px', color: '#BC4705', marginLeft: '10px' }}>Add to playlist</p>
                </div>

            </Box>
          </Grid>
  </>
  )
}

export default VideoCard