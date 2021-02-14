import React, {useEffect} from 'react'
import styles from './LoginForm.module.css'
import {Button, Form, Input, Row, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {onClearErrorMessage, onLogin} from "../../../redux/user/userActions";

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
  const errorMessage = useSelector((state: TRootState) => state.user.errorMessage)
  const [form] = Form.useForm<TLoginForm>()

  useEffect(() => {
    if (!errorMessage) return
    message.error(errorMessage)
    dispatch(onClearErrorMessage())
  }, [dispatch, errorMessage])

  const onFinish = (values: TLoginForm) => {
    dispatch(onLogin({login: values[LOGIN], password: values[PASSWORD]}))
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