import React, {useRef} from 'react'
import styles from "../Favourites.module.css";
import {Button} from "antd";

type TFavouritesItemProps = {
  name: string,
  onDelete: () => void,
  onEdit: () => void,
  onClick: () => void
}

const FavouritesItem: React.FC<TFavouritesItemProps> = ({name, onDelete, onEdit, onClick}) => {
  const liRef = useRef(null)
  const onClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.target === liRef.current) onClick()
  }

  return (
    <li ref={liRef} onClick={onClickHandler} className={styles.listItem}>
      {name}
      <span className={styles.buttons}>
            <Button
              onClick={onEdit}
              type='link'
            >
            Изменить
          </Button>
          <Button
            onClick={onDelete}
            type='link'
            danger
          >
            Удалить
          </Button>
          </span>
    </li>
  )
}

export default FavouritesItem