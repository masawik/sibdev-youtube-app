import React, {useState} from 'react'
import styles from './LoginForm.module.css'
import {Button, Form, Input, Row} from "antd";

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
  // todo получать isFetching из redux
  const [isFetching, setIsFetching] = useState(false)
  const [form] = Form.useForm<TLoginForm>()

  const onFinish = () => {
    setIsFetching(prevState => !prevState)
  }

  return (
    <Form
      onFinish={onFinish}
      form={form}
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