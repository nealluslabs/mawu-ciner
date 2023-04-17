import "./App.css"
import HomePage from "./pages/HomePage"
import { render } from "react-dom";
import { BrowserRouter as Router,Redirect, Switch, Route,useLocation } from "react-router-dom"
import Header from "./components/header/Header"
import LoginAndRegister from "./pages/LoginAndRegister"
import LibraryPage from "./pages/LibraryPage"
import ThemeProvider from './theme';
import { ToastContainer } from 'react-toastify';
import {useEffect,useState} from 'react'

function App() {
  const [loggedIn,setLoggedIn] = useState(true)
  const location = useLocation()
   console.log('pathname is', location.pathname) 

   useEffect(()=>{
    if(
     location.pathname === '/' || location.pathname === '/login' 
    ){
      setLoggedIn(false)
    }

   },[location.pathname])
  
  return (
    <>
     
       <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      <Router>
       <Header />
        <Switch>
        <Route
                exact
                path="/"
                render={() => {
                    return (
                     
                      <Redirect to="/login" /> 
                     
                    )
                }}
              />
          <Route exact path='/login' component={LoginAndRegister} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/library' component={LibraryPage} />
          
        </Switch>
      </Router>
     
     
    </>
  )
}

export default App
