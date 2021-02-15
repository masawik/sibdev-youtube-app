import React from 'react'
import {Card} from "antd"
import styles from './VideoItemCard.module.css'

export type TVideoItemProps = {
  previewURL: string,
  title: string,
  channelName: string,
  views: number
}

const VideoItemCard: React.FC<TVideoItemProps> = ({title, channelName, previewURL, views}) => {
  if (title.length >= 60) title = title.substr(0, 57) + '...'
  return (
      <Card
        hoverable
        className={styles.card}
        bordered={false}
        cover={<img alt="example" src={previewURL}/>}
      >
        <div className={styles.body}>
          <div className={styles.title}>
            {title}
          </div>

          <div className={styles.channelName}>
            {channelName}
          </div>

          <div className={styles.views}>
            {views} тыс. просмотров
          </div>
        </div>
      </Card>
  )
}

export default VideoItemCard