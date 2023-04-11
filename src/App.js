import "./App.css"
import HomePage from "./pages/HomePage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/header/Header"
import LoginAndRegister from "./pages/LoginAndRegister"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/auth' component={LoginAndRegister} />
        </Switch>
      </Router>
    </>
  )
}

export default App
