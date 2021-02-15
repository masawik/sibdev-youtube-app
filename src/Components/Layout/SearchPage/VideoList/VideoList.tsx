import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from "antd";
import cn from "classnames";
import styles from './VideoList.module.css'
import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons/lib";
import VideoItemCard from "./VideoItemCard/VideoItemCard";
import VideoItemList from "./VideoItemList/VideoItemList";
import {useSelector} from "react-redux";
import {TRootState} from "../../../../redux/rootReducer";
import {useLastViewMode} from "../../../../hooks/useVideoListLastViewMode";

const VideoList: React.FC = () => {
  const lastViewMode = useLastViewMode()
  const [viewMode, setViewMode] = useState<'list' | 'card'>(lastViewMode || 'card')
  const videos = useSelector((state: TRootState) => state.search.videos)
  const query = useSelector((state: TRootState) => state.search.query)
  const totalResults = useSelector((state: TRootState) => state.search.totalResults)

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode)
  }, [viewMode])

  //todo добавить статистику
  const VideoItemComponent = viewMode === "list" ? VideoItemList : VideoItemCard
  const $videoList = videos?.map((videoItem) => {
    return (
      <Col>
        <VideoItemComponent
          key={videoItem.id.videoId}
          title={videoItem.snippet.title}
          views={786}
          channelName={videoItem.snippet.channelTitle}
          previewURL={videoItem.snippet.thumbnails.medium.url}
        />
      </Col>
    )
  })

  return (
    <>
      <Row align='middle' justify='space-between'>
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
            onClick={() => setViewMode("card")}
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
      <Row gutter={[20, 32]}>{$videoList}</Row>
    </>
  )
}

export default VideoList