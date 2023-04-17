import React, { useState,useEffect } from "react"
import "./header.css"
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { Avatar } from "@material-ui/core";
import { Link, useHistory,useLocation } from "react-router-dom";
import {ExitToApp} from '@mui/icons-material';


const Header = () => {
  const location = useLocation()
  const [Mobile, setMobile] = useState(false)
  const history = useHistory();
  const [loggedIn,setLoggedIn] =useState(true)

  useEffect(()=>{
    if(
     location.pathname === '/' || location.pathname === '/login' 
    ){
      setLoggedIn(false)
    }else{
      setLoggedIn(true)
    }

   },[location.pathname])
  return (
    <>
      {loggedIn &&
       <header>
        <div className='container flexSB'>
          <nav className='flexSB'>
            <div className='logo'>
              <img src='./images/logo.png' height="70px" alt='' />
            </div>
            {/*<ul className='flexSB'>*/}
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <li>
              <Link to ={'/home'} > Home</Link>
              </li>
              <li>
                <Link to ={'/library'} style={{marginLeft:"30px"}}> Library</Link>
              </li>
              <li>
                <a href='#'>Discord</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
          <SearchIcon style={{ marginRight: '20px', fontSize: '26px' }} />
          <NotificationsNoneIcon style={{ marginRight: '20px', fontSize: '26px' }} />
          {/*<Avatar
            alt="User Avatar"
            
          />*/}
         
          <ExitToApp onClick={()=>{history.push('/')}} sx={{ width: 45, height: 45 }}/>
         
        </div>

        </div>
      </header>
      }
    </>
  )
}

export default Header
