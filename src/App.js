import "./App.css"
import HomePage from "./pages/HomePage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/header/Header"
import LoginAndRegister from "./pages/LoginAndRegister"
import LibraryPage from "./pages/LibraryPage"
import ThemeProvider from './theme';
import { ToastContainer } from 'react-toastify';


function App() {
  
  const location = window.location.pathname;
   console.log('pathname is', location.length) 
  
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
       {location !== '/login' && <Header />}
        <Switch>
          <Route exact path='/login' component={LoginAndRegister} />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/library' component={LibraryPage} />
          
        </Switch>
      </Router>
     
     
    </>
  )
}

export default App
