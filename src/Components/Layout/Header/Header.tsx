import React from 'react'
import {Button, Layout, Row} from "antd"
import {Menu} from "antd"
import cn from 'classnames'
import styles from './Header.module.css'
import LOGO from '../../sharedImgs/logo.svg'
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {onUserLogout} from "../../../redux/user/userActions";

const Header: React.FC = () => {
  const {pathname} = useLocation()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(onUserLogout())
  }

  return (
    <Layout.Header className={styles.header}>
      <Row align='middle' className='container'>
        <img className={cn('logo', styles.logo)} src={LOGO}  alt='sibdev logo'/>

        <Menu className={styles.menu} theme="light" mode="horizontal" selectedKeys={[pathname]}>
          <Menu.Item key="/search">
            <Link to='/search'>
              Поиск
            </Link>
          </Menu.Item>

          <Menu.Item key="/favourites">
            <Link to='/favourites'>
              Избранное
            </Link>
          </Menu.Item>
        </Menu>

        <Button
          type='link'
          onClick={logout}
          className={cn('ant-menu-item', styles.logout)}
        >
          Выйти
        </Button>
      </Row>
    </Layout.Header>
  )
}

export default Header