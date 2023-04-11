import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  },
});

const Login = ({ handleChange }) => {
  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    height: "63vh",
    width: 300,
    margin: "0 auto",
    background: "black",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = {
    margin: "8px 0",
    backgroundColor: "#FF7D05",
    padding: "10px",
    marginTop: "20px",
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <br />
        </Grid>
        <TextField
          fullWidth
          required
          style={{
            border: "1px solid #2F2F2F",
            borderRadius: "8px",
            padding: "10px",
            color: "white",
          }}
          InputProps={{
            classes: {
              root: classes.root,
            },
            placeholder: "Email address",
          }}
        />
        <br />
        <br />
        <TextField
          // label='.'
          fullWidth
          required
          style={{
            border: "1px solid #2F2F2F",
            borderRadius: "8px",
            padding: "10px",
            color: "white",
          }}
          InputProps={{
            classes: {
              root: classes.root,
            },
            placeholder: "Password",
          }}
        />
        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Login
        </Button>
        <p style={{ color: "#8D8D8D", fontSize: "15px", textAlign: "center" }}>
          {" "}
          See our &nbsp;
          <Link
            href="#"
            onClick={() => handleChange("event", 1)}
            style={{ color: "#FF7D05" }}
          >
            Terms & Privacy policy
          </Link>
        </p>
      </Paper>
    </Grid>
  );
};

export default Login;
