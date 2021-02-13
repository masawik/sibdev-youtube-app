import React, {useState} from 'react'
import {Button, Col, Row} from "antd";
import cn from "classnames";
import styles from './VideoList.module.css'
import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons/lib";
import VideoItemCard from "./VideoItemCard/VideoItemCard";
import VideoItemList from "./VideoItemList/VideoItemList";

const VideoList: React.FC = () => {
  //todo сохранять предпочтительный  вид отображения в ls
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card')
  const query = 'Чем кормить кота'

  return (
    <>
      <Row align='middle' justify='space-between'>
        <Col>
          <span className={styles.listTitle}>
            Видео по запросу <strong>«{query}»</strong>
          </span>
          <span className={styles.count}>
            7230
          </span>
        </Col>
        <Col>
          <Button className={styles.btn} type='link'>
            <UnorderedListOutlined
              className={cn(
                styles.viewSelectorIcon,
                {[styles.viewSelectorIcon_selected]: viewMode === 'list'}
                )}
            />
          </Button>
          <Button className={styles.btn} type='link'>
            <AppstoreOutlined
              className={cn(
                styles.viewSelectorIcon,
                {[styles.viewSelectorIcon_selected]: viewMode === 'card'}
              )}
            />
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <VideoItemCard
            previewURL='https://i.ytimg.com/vi/mlc1_8BXNOc/maxresdefault.jpg'
            title='Как кормить кошку натуралкой | Перечень полезных для кош...'
            channelName='Ветеринария и Кормление соб...'
            views={768}
          />
          <VideoItemList
            previewURL='https://i.ytimg.com/vi/mlc1_8BXNOc/maxresdefault.jpg'
            title='Как кормить кошку натуралкой | Перечень полезных для кошек продуктов и советы по составлению рациона'
            channelName='Ветеринария и Кормление собак и кошек'
            views={768}
          />
        </Col>
      </Row>
    </>
  )
}

export default VideoList