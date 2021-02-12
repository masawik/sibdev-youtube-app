import React from 'react'
import {Layout} from "antd"
import Header from "./Header/Header";
import SearchPage from "./SearchPage/SearchPage";
const { Content} = Layout

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Header/>
      <Content>
        <div className='container'>
          <SearchPage/>
        </div>
      </Content>
    </Layout>
  )
}

export default Dashboard