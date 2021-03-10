import React from 'react'
import {Layout as AntdLayout} from 'antd'
import Header from '../Header/Header'
import FavouritesModal from '../FavouritesModal/FavouritesModal'
import {Redirect} from 'react-router-dom'
import {LOGIN} from '../../constants'
import {useToken} from '../../hooks/useToken'
import VideoDrawer from '../videoDrawer/videoDrawer'

const {Content} = AntdLayout

const Layout: React.FC = ({children}) => {
  const [token] = useToken()
  if (!token) return <Redirect to={`/${LOGIN}`}/>
  return (
    <AntdLayout>
      <Header/>

      <Content>
        <div className='container'>
          {children}
        </div>
        <FavouritesModal/>
        <VideoDrawer/>
      </Content>
    </AntdLayout>
  )
}

export default Layout