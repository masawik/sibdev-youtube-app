import React from 'react'
import {Layout as AntdLayout} from "antd"
import Header from "./Header/Header";
import SearchPage from "./SearchPage/SearchPage";
import Favourites from "./Favourites/Favourites";
import FavouritesModal from "./Favourites/FavouritesModal/FavouritesModal";
import {Switch, Route, Redirect } from "react-router-dom";
import {FAVOURITES, LOGIN, SEARCH} from "../../constants";
import {useSelector} from "react-redux";
import {TRootState} from "../../redux/rootReducer";
const {Content} = AntdLayout

const Layout: React.FC = () => {
   const authToken = useSelector((state: TRootState) => state.user.token)
  if (!authToken) return <Redirect to={`/${LOGIN}`} />
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