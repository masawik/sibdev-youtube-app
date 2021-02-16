import React, {useEffect} from 'react'
import './globalCss/antdOverload.GLOBAL.css'
import './globalCss/App.GLOBAL.css'
import Layout from "./Components/Layout/Layout"
import {Switch, Route, Redirect} from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage/LoginPage"
import {LOGIN} from "./constants";
import {useDispatch} from "react-redux";
import {onUserInit} from "./redux/user/userActions";
import {useAlert} from "./hooks/useAlert";

const App: React.FC = () => {
  const dispatch = useDispatch()
  useAlert()
  //todo пофиксить инициализацию так, чтобы роуты работали
  //todo обернуть функции в компонентах в useCallback
  //todo добавить анимации по возможности
  //todo убрать ошибки из консоли
  useEffect(() => {
    dispatch(onUserInit())
  }, [dispatch])

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
          <Redirect to='/'/>
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default App