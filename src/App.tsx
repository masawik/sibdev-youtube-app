import React, {useEffect} from 'react'
import './globalCss/antdOverload.GLOBAL.css'
import './globalCss/App.GLOBAL.css'
import Layout from "./Components/Layout/Layout"
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage/LoginPage"
import {FAVOURITES, LOGIN, SEARCH} from "./constants";
import {useAlert} from "./hooks/useAlert";
import {useDispatch} from "react-redux";
import {onUserInit} from "./redux/user/userActions";
import Favourites from "./Components/Layout/Favourites/Favourites";
import SearchPage from "./Components/Layout/SearchPage/SearchPage";

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onUserInit())
  }, [dispatch])
  useAlert()

  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path={`/${LOGIN}`}>
            <LoginPage/>
          </Route>

          <Layout>
            <Switch>
              <Route path={`/${FAVOURITES}`}>
                <Favourites/>
              </Route>

              <Route path={`/${SEARCH}`}>
                <SearchPage/>
              </Route>

              <Route>
                <Redirect to={`/${SEARCH}`}/>
              </Route>
            </Switch>
          </Layout>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App