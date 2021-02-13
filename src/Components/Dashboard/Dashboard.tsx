import React from 'react'
import {Layout} from "antd"
import Header from "./Header/Header";
import SearchPage from "./SearchPage/SearchPage";
import Favourites from "./Favourites/Favourites";
const { Content} = Layout

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Header/>
      <Content>
        <div className='container'>
          {/*<SearchPage/>*/}
          <Favourites/>
        </div>
      </Content>
    </Layout>
  )
}

export default Dashboard