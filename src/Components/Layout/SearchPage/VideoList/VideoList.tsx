import React, {useState} from 'react'
import {Button, Col, Row, Space} from "antd";
import cn from "classnames";
import styles from './VideoList.module.css'
import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons/lib";
import VideoItemCard from "./VideoItemCard/VideoItemCard";
import VideoItemList from "./VideoItemList/VideoItemList";
import {useSelector} from "react-redux";
import {TRootState} from "../../../../redux/rootReducer";

const VideoList: React.FC = () => {
  //todo сохранять предпочтительный  вид отображения в ls
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card')
  const videos = useSelector((state: TRootState) => state.search.videos)
  const query = useSelector((state: TRootState) => state.search.query)
  const totalResults = useSelector((state: TRootState) => state.search.totalResults)

  //todo добавить количество просмотров
  const VideoItemComponent = viewMode === "list" ? VideoItemList : VideoItemCard
  const $videoList = videos?.map((videoItem) => {
    return (
      <Col>
        <VideoItemComponent
          key={videoItem.id.videoId}
          title={videoItem.snippet.title}
          views={787}
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