import React from 'react'
import styles from './LoginPage.module.css'
import LOGO from '../../../sharedImgs/logo.svg'
import {Col, ColProps,Row} from "antd";
import LoginForm from "../LoginForm/LoginForm";
import {useSelector} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {Redirect} from "react-router-dom";

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
  const authToken = useSelector((state: TRootState) => state.user.token)

  if (authToken) return <Redirect to={`/`} />
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
          <img className={styles.logo} src={LOGO} alt="sibDev-logo"/>
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