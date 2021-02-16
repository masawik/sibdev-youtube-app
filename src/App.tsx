import React, {useEffect} from 'react'
import './globalCss/antdOverload.GLOBAL.css'
import './globalCss/App.GLOBAL.css'
import Layout from "./Components/Layout/Layout"
import {Switch, Route} from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage/LoginPage"
import {LOGIN} from "./constants";
import {useDispatch} from "react-redux";
import {onUserInit} from "./redux/user/userActions";
import {useAlert} from "./hooks/useAlert";

const App: React.FC = () => {
  const dispatch = useDispatch()
  useAlert()
  useEffect(() => {
    dispatch(onUserInit())
  }, [dispatch])

  return (
    <React.Fragment>
      <Switch>
        <Route path={`/${LOGIN}`} component={LoginPage}/>
        <Route path='*' component={Layout}/>
      </Switch>
    </React.Fragment>
  )
}

export default App