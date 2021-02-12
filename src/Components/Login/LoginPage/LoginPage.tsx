import React from 'react'
import styles from './LoginPage.module.css'
import logoIMG from './img/logo_big.png'
import {Col, ColProps,Row} from "antd";
import LoginForm from "../LoginForm/LoginForm";

const CONTAINER_LAYOUT: ColProps = {
  xxl: 7,
  xl: 9,
  lg: 12,
  md: 16,
  sm: 20,
  xs: 22
}
const FORM_BOX_LAYOUT: ColProps = {
  sm: 15,
  xs: 18
}

const LoginPage: React.FC = () => {

  return (
    <Row
      justify='center'
      align='middle'
      style={{height: '100vh'}}
    >
      <Col
        className={styles.container}
        {...CONTAINER_LAYOUT}
      >
        <Row justify='center'>
          <img src={logoIMG} alt="sibDev-logo"/>
        </Row>

        <Row className={styles.titleBox} justify='center'>
          <h1 className={styles.title}>Вход</h1>
        </Row>

        <Row className={styles.formBox} justify='center'>
          <Col {...FORM_BOX_LAYOUT}>
            <LoginForm/>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default LoginPage