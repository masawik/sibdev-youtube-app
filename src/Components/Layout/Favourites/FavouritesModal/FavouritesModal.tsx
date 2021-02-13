import React, {useState} from 'react'
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select, Slider} from "antd"
import styles from './FavouriteModal.module.css'


const FavouritesModal: React.FC = () => {
  const [query, setQuery] = useState('Чем кормить кота')
  const [name, setName] = useState('')
  const [sort, setSort] = useState<'any' | 'decr' | 'incr'>('any')
  const [maxCount, setMaxCount] = useState(25)

  return (
    <Modal
      visible={false}
      centered={true}
      closable={false}
      footer={null}
    >
      <Row className={styles.titleBox} justify='center'>
        <h1 className={styles.title}>Сохранить запрос</h1>
      </Row>

      <Form
        layout='vertical'
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Запрос"
          name="query"
          rules={[{ required: true, message: 'Please input your username!' }]}
          required={false}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Укажите название запроса' }]}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Укажите название'
          />
        </Form.Item>

        <Form.Item
          label="Сортировать по"
          name='sort'
        >
          <Select
            value={sort}
            onChange={(val) => setSort(val)}
            className='select'
          >
            <Select.Option value="any">Без сортировки</Select.Option>
            <Select.Option value="incr">По возрастанию</Select.Option>
            <Select.Option value="decr">По убыванию</Select.Option>
          </Select>
        </Form.Item>

          <Form.Item
            label='Максимальное количество'
            name='maxCount'
          >
            <Row align='middle'>
              <Col flex='auto'>
                <Slider
                  value={maxCount}
                  onChange={(val: number) => setMaxCount(val)}
                  min={0}
                  max={50}
                />
              </Col>

              <Col flex='100px'>
                <InputNumber
                  value={maxCount}
                  onChange={(val) => setMaxCount(Number(val))}
                  min={0}
                  max={50}
                />
              </Col>
            </Row>
          </Form.Item>

        <Row justify='space-between'>
          <Form.Item>
            <Button htmlType="button">
              Не сохранять
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  )
}

export default FavouritesModal