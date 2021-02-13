import React from 'react'
import {Layout as AntdLayout} from "antd"
import Header from "./Header/Header";
import SearchPage from "./SearchPage/SearchPage";
import Favourites from "./Favourites/Favourites";
import FavouritesModal from "./Favourites/FavouritesModal/FavouritesModal";
import {Switch, Route, Redirect } from "react-router-dom";
import {FAVOURITES, SEARCH} from "../../constants";
const {Content} = AntdLayout

const Layout: React.FC = () => {
  return (
    <AntdLayout>
      <Content>
        <Header/>
        <div className='container'>
          <Switch>
            <Route path={`/${FAVOURITES}`}>
              <Favourites/>
            </Route>

            <Route path={`/${SEARCH}`}>
              <SearchPage/>
            </Route>

            <Route path='/'>
              <Redirect to={`/${SEARCH}`} />
            </Route>
          </Switch>
        </div>

        <FavouritesModal/>
      </Content>
    </AntdLayout>
  )
}

export default Layout