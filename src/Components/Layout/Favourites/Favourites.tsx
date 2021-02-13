import React from 'react'
import {Button, Row} from "antd"
import styles from './Favourites.module.css'

const Favourites: React.FC = () => {
  const data = [
    'Видео1',
    'Видео2',
  ]
  return (
    <>
      <Row className={styles.titleBox}>
        <h1 className={styles.title}>Избранное</h1>
      </Row>

      <ul className={styles.list}>
        <li className={styles.listItem}>
          видео 1
          <span className={styles.buttons}>
            <Button
              type='link'
            >
            Изменить
          </Button>
          <Button
            type='link'
            danger
          >
            Удалить
          </Button>
          </span>
        </li>
      </ul>
    </>
  )
}

export default Favourites