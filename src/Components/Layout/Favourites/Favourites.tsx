import React, {useEffect} from 'react'
import {Row, Spin} from 'antd'
import styles from './Favourites.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {TRootState} from '../../../redux/rootReducer'
import FavouritesItem from './FavouritesItem/FavouritesItem'
import {onFavouritesListDeleteRecord} from '../../../redux/favourites/favouritesActions'
import {onFavouritesModalOpenEdit} from '../../../redux/favouritesModal/favouritesModalActions'
import {useHistory} from 'react-router-dom'
import {TITLE_BASE} from '../../../constants'

const Favourites: React.FC = () => {
  useEffect(() => {
    document.title = `${TITLE_BASE} - избранное`
  }, [])
  const dispatch = useDispatch()
  const history = useHistory()
  const list = useSelector((state: TRootState) => state.favourites.items)
  const isFetching = useSelector((state: TRootState) => state.favourites.isFetching)


  const $list = list.map((i) => (
    <FavouritesItem
      key={i.id}
      onClick={() => history.push(`/search?q=${i.query}&sort=${i.sort}&maxCount=${i.maxCount}`)}
      onEdit={() => dispatch(onFavouritesModalOpenEdit(i.id))}
      onDelete={() => dispatch(onFavouritesListDeleteRecord(i.id))}
      name={i.name}
    />
  ))

  return (
    <>
      <Row className={styles.titleBox}>
        <h1 className={styles.title}>Избранное</h1>
      </Row>

      <Spin spinning={isFetching} tip="Loading...">
        <ul className={styles.list}>
          {!list.length && <Row justify='center'>список пуст :(</Row>}
          {$list}
        </ul>
      </Spin>
    </>
  )
}

export default Favourites