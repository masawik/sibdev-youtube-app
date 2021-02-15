import React from 'react'
import {Row} from "antd"
import styles from './Favourites.module.css'
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import FavouritesItem from "./FavouritesItem/FavouritesItem";
import {onFavouritesListDeleteRecord} from "../../../redux/favourites/favouritesActions";
import {onFavouritesModalOpenEdit} from "../../../redux/favouritesModal/favouritesModalActions";
//todo добавить состояние загрузки списка
//todo добавить заглушку при пустом списке
const Favourites: React.FC = () => {
  const dispatch = useDispatch()
  const list = useSelector((state: TRootState) => state.favourites.items)
  const $list = list.map((i) => (
    <FavouritesItem
      key={i.id}
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

      <ul className={styles.list}>
        {$list}
      </ul>
    </>
  )
}

export default Favourites