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
  return (
    <Card
      hoverable
      style={{ width: 245 }}
      bodyStyle={{backgroundColor: '#FAFAFA'}}
      bordered={false}
      cover={<img alt="example" src={previewURL} />}
    >
      <div className={styles.body}>
        <div className={styles.title}>
          {title}
        </div>

        <div className={styles.channelName}>
          {channelName}
        </div>

        <div className={styles.views}>
          {views}тыс. просмотров
        </div>
      </div>
    </Card>
  )
}

export default VideoItemCard