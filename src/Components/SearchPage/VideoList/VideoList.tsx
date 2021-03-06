import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'antd'
import cn from 'classnames'
import styles from './VideoList.module.css'
import {AppstoreOutlined, UnorderedListOutlined} from '@ant-design/icons/lib'
import VideoItem from './VideoItem/VideoItem'
import {useDispatch, useSelector} from 'react-redux'
import {TRootState} from '../../../redux/rootReducer'
import {useLastViewMode} from '../../../hooks/useVideoListLastViewMode'
import {onVideoDrawerOpen} from '../../../redux/videoDrawer/videoDrawerActions'

const VideoList: React.FC = () => {
  const dispatch = useDispatch()
  const lastViewMode = useLastViewMode()
  const [viewMode, setViewMode] = useState<'list' | 'card'>(lastViewMode || 'card')
  const videos = useSelector((state: TRootState) => state.search.videos)
  const query = useSelector((state: TRootState) => state.search.query)
  const totalResults = useSelector((state: TRootState) => state.search.totalResults)

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode)
  }, [viewMode])

  const $videoList = videos?.map((videoItem) => {
    const views = videoItem.views
    let viewsStr = String(views)
    if (views >= 1000 && views < 1000000) viewsStr = viewsStr.substr(0, viewsStr.length - 3) + ' тыс.'
    if (views >= 1000000) viewsStr = viewsStr.substr(0, viewsStr.length - 6) + ' млн.'
    return (
      <Col key={videoItem.id.videoId}>
        <VideoItem
          onClick={() => dispatch(onVideoDrawerOpen(videoItem.id.videoId))}
          viewMode={viewMode}
          title={videoItem.snippet.title}
          views={viewsStr}
          channelName={videoItem.snippet.channelTitle}
          previewURL={videoItem.snippet.thumbnails.medium.url}
        />
      </Col>
    )
  })

  return (
    <>
      <Row align='middle' justify='space-between' >
        <Col>
          <span className={styles.listTitle}>
            Видео по запросу <strong>«{query}»</strong>
          </span>
          <span className={styles.count}>
            {totalResults}
          </span>
        </Col>
        <Col>
          <Button
            onClick={() => setViewMode('list')}
            className={styles.btn}
            type='link'
          >
            <UnorderedListOutlined
              className={cn(
                styles.viewSelectorIcon,
                {[styles.viewSelectorIcon_selected]: viewMode === 'list'}
              )}
            />
          </Button>
          <Button
            onClick={() => setViewMode('card')}
            className={styles.btn}
            type='link'
          >
            <AppstoreOutlined
              className={cn(
                styles.viewSelectorIcon,
                {[styles.viewSelectorIcon_selected]: viewMode === 'card'}
              )}
            />
          </Button>
        </Col>
      </Row>
      <Row
        justify={viewMode === 'card' ? 'center' : 'start'}
        gutter={[20, 32]}
      >
        {$videoList}
      </Row>
    </>
  )
}

export default VideoList