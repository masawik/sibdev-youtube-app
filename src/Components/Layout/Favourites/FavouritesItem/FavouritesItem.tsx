import React from 'react'
import styles from "../Favourites.module.css";
import {Button} from "antd";

type TFavouritesItemProps = {
  name: string,
  onDelete: () => void,
  onEdit: () => void
}

const FavouritesItem: React.FC<TFavouritesItemProps> = ({name, onDelete, onEdit}) => {
  return (
    <li className={styles.listItem}>
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