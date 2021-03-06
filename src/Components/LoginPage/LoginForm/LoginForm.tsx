import React, {useCallback} from 'react'
import styles from './LoginForm.module.css'
import {Button, Form, Input, Row} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {TRootState} from '../../../redux/rootReducer'
import {onUserLogin} from '../../../redux/user/userActions'

const LOGIN = 'LOGIN'
const PASSWORD = 'PASSWORD'

type TLoginForm = {
  [LOGIN]: string,
  [PASSWORD]: string
}

const INPUT_VALIDATION_RULES = [
  {required: true, whitespace: true, message: 'поле обязательно для заполнения'},
  {max: 20, message: 'слишком длинное значение'}
]

const LoginForm: React.FC = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector((state: TRootState) => state.user.isFetching)
  const onFinish = useCallback((values: TLoginForm) => {
    dispatch(onUserLogin({login: values[LOGIN], password: values[PASSWORD]}))
  }, [dispatch])

  return (
    <Form
      onFinish={onFinish}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item
        name={LOGIN}
        rules={INPUT_VALIDATION_RULES}
        label='Логин'
        className='label-muted'
      >
        <Input disabled={isFetching}/>
      </Form.Item>

      <Form.Item
        name={PASSWORD}
        rules={INPUT_VALIDATION_RULES}
        label='Пароль'
        className='label-muted'
      >
        <Input.Password disabled={isFetching}/>
      </Form.Item>

      <Row className={styles.btnBox} justify='center'>
        <Form.Item>
          <Button loading={isFetching} type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default LoginForm