import React, { useState } from "react"
import "./header.css"
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";



const Header = () => {
  const [Mobile, setMobile] = useState(false)
  const history = useHistory();
  return (
    <>
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
                <a href='/'>Home</a>
              </li>
              <li>
                <a href="/library" /*onClick={() => history.push('/auth')}*/>Library</a>
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
          <Avatar
            alt="User Avatar"
            sx={{ width: 80, height: 80 }}
          />
        </div>

        </div>
      </header>
    </>
  )
}

export default Header
