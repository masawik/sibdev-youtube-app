import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select, Slider} from "antd"
import styles from './FavouriteModal.module.css'
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {onFavouritesModalClose} from '../../../redux/favouritesModal/favouritesModalActions'
import {TSearchOrder} from "../../../redux/api/youtubeAPI";
import {onFavouritesListAddRecord, onFavouritesListEditRecord} from "../../../redux/favourites/favouritesActions";
import {useForm} from "antd/lib/form/Form";

type TFormFields = {
  query: string,
  maxCount: number,
  name: string,
  sort: TSearchOrder,
}

const FavouritesModal: React.FC = () => {
  const dispatch = useDispatch()
  const [formInstance] = useForm<TFormFields>()
  const {query, isVisible, maxCount, isFetching, name, sort, recordId} = useSelector((state: TRootState) => state.favouritesModal)
  const [maxCountValue, setMaxCountValue] = useState<number>(12)

  useEffect(() => {
    formInstance.resetFields()
  }, [formInstance, isVisible])

  useEffect(() => {
    setMaxCountValue(maxCount)
  }, [maxCount])

  const onMaxCountChange = (value: number) => {
    if (!isNaN(value)) setMaxCountValue(value)
  }

  const onClose = () => {
    dispatch(onFavouritesModalClose())
  }

  const onSubmit = (val: TFormFields) => {
    if (recordId) {
      dispatch(onFavouritesListEditRecord({...val, maxCount: maxCountValue, id: recordId}))
    } else {
      dispatch(onFavouritesListAddRecord({...val, maxCount: maxCountValue}))
    }
  }

  const formInitialValues: TFormFields = {
    maxCount: maxCount || 12,
    name: name || "",
    query: query || "",
    sort: sort || "any"
  }

  const $sortOptions = [
    {value: 'relevance', description: 'по релевантности'},
    {value: 'date', description: 'по времени'},
    {value: 'rating', description: 'по рейтингу'},
    {value: 'title', description: 'по названию'},
    {value: 'viewCount', description: 'по просмотрам'},
  ].map((i) => <Select.Option key={i.value} value={i.value}>{i.description}</Select.Option>)

  return (
    <Modal
      visible={isVisible}
      centered={true}
      closable={false}
      footer={null}
    >
      <Row className={styles.titleBox} justify='center'>
        <h1 className={styles.title}>
          {
            recordId
              ? 'Сохранить запрос'
              : 'Изменить запрос'
          }
        </h1>
      </Row>

      <Form
        layout='vertical'
        onFinish={onSubmit}
        form={formInstance}
        initialValues={formInitialValues}
      >
        <Form.Item
          label="Запрос"
          name='query'
          rules={[{required: true, message: 'нельзя оставить поле пустым!'}]}
          required={false}
        >
          <Input
            disabled={!Boolean(recordId) || isFetching}
          />
        </Form.Item>

        <Form.Item
          label="Название"
          name='name'
          rules={[{required: true, message: 'Укажите название запроса'}]}
        >
          <Input
            placeholder='Укажите название'
            disabled={isFetching}
          />
        </Form.Item>

        <Form.Item
          name='sort'
          label="Сортировать по"
        >
          <Select
            className='select'
            disabled={isFetching}
          >
            <Select.Option className={styles.firstSelectOption} value='any'>Без сортировки</Select.Option>
            {$sortOptions}
          </Select>
        </Form.Item>

        <Form.Item
          label='Максимальное количество'
          name='maxCount'
        >
          <Row align='middle'>
            <Col flex='auto'>
              <Slider
                value={maxCountValue}
                onChange={onMaxCountChange}
                min={0}
                max={50}
                disabled={isFetching}
              />
            </Col>

            <Col flex='100px'>
              <InputNumber
                value={maxCountValue}
                onChange={(value) => onMaxCountChange(Number(value))}
                min={0}
                max={50}
                disabled={isFetching}
              />
            </Col>
          </Row>
        </Form.Item>

        <Row justify='space-between'>
          <Form.Item>
            <Button
              className={styles.btn}
              disabled={isFetching}
              onClick={onClose}
              htmlType="button"
            >
              Не сохранять
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.btn}
              loading={isFetching}
              type="primary"
              htmlType="submit"
            >
              Сохранить
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  )
}

export default FavouritesModal