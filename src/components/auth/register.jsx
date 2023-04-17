import React,{ useState } from "react";
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
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { signup } from '../../redux/actions/auth.action';
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

const Register = ({ handleChange }) => {
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

  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const dispatch = useDispatch();
  const history = useHistory();

  function userSignup(model) {
   
    const user = { fullName,
                  
                   email,
                   
                   password,
                   
                 };
   // history('/dashboard/home')
    // console.log("THIS IS USER",user)
    dispatch(signup(user, history));
  }


  const { isLoading, error,user,message } = useSelector( (state) => state.auth); 
  console.log("this is error",error)

   // const { isLoading, error } = useSelector( (state) => state.login);

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <br />
        </Grid>
        <TextField
        value={fullName}
        onChange={(e)=>{setFullName(e.target.value)}}
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
            placeholder: "Full Name",
          }}
          
        />
        <br />
        <br />
        <TextField
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
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
         
          value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
          fullWidth
          type={"password"}
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
          onClick = {userSignup}
        >
          Register
        </Button>
        <p style={{ color: "#8D8D8D", fontSize: "15px", textAlign: "center" }}>
          {" "}
          Already have an account? &nbsp;
          <Link
            href="#"
            style={{ color: "#FF7D05" }}
          >
            Login
          </Link>
        </p>

        {error && error.errorMessage && <div><Alert style={{ position:"relative",top:"5rem" ,opacity:"1" }} //opactiy condition{/*error?"1":"0"*/}
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '14px' }}><b>{error.errorMessage}</b></p>
      </Alert><br/></div>}


      </Paper>
    </Grid>
  );
};

export default Register;
