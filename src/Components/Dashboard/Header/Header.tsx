import React from 'react'
import {Button, Layout, Row} from "antd"
import {Menu} from "antd"
import cn from 'classnames'
import styles from './Header.module.css'
import LOGO from '../../../sharedImgs/logo.svg'

const Header: React.FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Row align='middle' className='container'>
        <img className={cn('logo', styles.logo)} src={LOGO}  alt='sibdev logo'/>

        <Menu className={styles.menu} theme="light" mode="horizontal" selectedKeys={['1']}>
          <Menu.Item key="1">Поиск</Menu.Item>
          <Menu.Item key="2">Избранное</Menu.Item>
        </Menu>

        <Button type='link' className={cn('ant-menu-item', styles.logout)}>
          Выйти
        </Button>
      </Row>
    </Layout.Header>
  )
}

export default Header