import React from 'react'
import './globalCss/antdOverload.GLOBAL.css'
import './globalCss/App.GLOBAL.css'
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginPage from "./Components/Login/LoginPage/LoginPage";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Dashboard/>
      {/*<LoginPage/>*/}
    </React.Fragment>
  )
}

export default App