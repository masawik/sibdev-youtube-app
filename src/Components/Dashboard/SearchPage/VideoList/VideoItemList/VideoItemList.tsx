import React from 'react'
import styles from './VideoItemList.module.css'
import {TVideoItemProps} from "../VideoItemCard/VideoItemCard";
import cn from "classnames";

const VideoItemList: React.FC<TVideoItemProps> = ({views, channelName, title, previewURL}) => {
  //todo генерировать alt для изображений
  return (
    <div className={cn(styles.card, 'ant-card-hoverable')}>
      <img className={styles.preview} src={previewURL} alt=""/>

      <div className={styles.body}>
        <div className={styles.title}>
          {title}
        </div>

        <div>
          <div className={styles.channelName}>
            {channelName}
          </div>

          <div className={styles.views}>
            {views}тыс. просмотров
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItemList