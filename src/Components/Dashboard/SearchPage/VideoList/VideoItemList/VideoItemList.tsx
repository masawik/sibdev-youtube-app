import React from 'react'
import styles from './VideoItemList.module.css'
import {TVideoItemProps} from "../sharedVideoListTypes"

const VideoItemList: React.FC<TVideoItemProps> = ({views, channelName, title, previewURL}) => {
  //todo генерировать alt для изображений
  return (
    <div className={styles.card}>
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