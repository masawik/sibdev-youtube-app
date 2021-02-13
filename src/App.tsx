import React, {useState} from 'react'
import './globalCss/antdOverload.GLOBAL.css'
import './globalCss/App.GLOBAL.css'
import Layout from "./Components/Layout/Layout"
import {Switch, Route, Redirect} from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage/LoginPage"
import {LOGIN} from "./constants";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <React.Fragment>
      <Switch>
        <Route path={`/${LOGIN}`}>
          <LoginPage/>
        </Route>

        <Route path='/'>
          <Layout/>
        </Route>

        <Route path='*'>
          {
            isLoggedIn
            ? <Redirect to='/'/>
            : <Redirect to={`/${LOGIN}`}/>
          }
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default App