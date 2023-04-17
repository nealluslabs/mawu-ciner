import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import Alert from '@mui/material/Alert';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { signin, logout } from '../../redux/actions/auth.action';
import { logoutSuccess } from '../../redux/reducers/auth.slice';

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
 
  const { isLoading, error,user,message } = useSelector( (state) => state.auth); 
  console.log("this is error",error)

   const dispatch = useDispatch()
   const history  =useHistory()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  function onSubmit() {
    // dispatch(submitLogin(model));
   
    const user = { email, password };
    dispatch(signin(user, history));
    
  }

 
 
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
          value ={email}
          onChange={(e)=>setEmail(e.target.value)}
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
          type={"password"}
          value ={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={onSubmit}
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
        {error && <div><Alert style={{ position:"relative",top:"5rem" ,opacity:"1" }} //opactiy condition{/*error?"1":"0"*/}
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '14px' }}><b>{error}</b></p>
      </Alert><br/></div>}
      </Paper>
    </Grid>
  );
};

export default Login;
