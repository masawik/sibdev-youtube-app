import React from 'react'
import styles from './VideoItem.module.css'
import cn from 'classnames'

export type TVideoItemProps = {
  previewURL: string,
  title: string,
  channelName: string,
  views: string,
  viewMode: 'card' | 'list',
  onClick: () => void
}

const VideoItem: React.FC<TVideoItemProps> = ({views, channelName, title, previewURL, viewMode, onClick}) => {
  const isCardMode = viewMode === 'card'
  if (isCardMode && title.length >= 60) title = title.substr(0, 57) + '...'
  return (
    <div onClick={onClick} className={cn(styles.container, 'ant-card-hoverable', {[styles.card]: isCardMode})}>
      <img className={styles.preview} src={previewURL} alt={title}/>

      <div className={styles.body}>
        <div className={styles.title}>
          {title}
        </div>

        <div>
          <div className={styles.channelName}>
            {channelName}
          </div>

          <div className={styles.views}>
            {views} просмотров
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem