import React, {useEffect} from 'react'
import {Col, Row} from 'antd'
import Search from './Search/Search'
import VideoList from './VideoList/VideoList'
import {useQuery} from '../../../hooks/useQuery'
import {useDispatch, useSelector} from 'react-redux'
import {TRootState} from '../../../redux/rootReducer'
import {onSearch} from '../../../redux/search/searchActions'
import {TSearchOrder} from '../../../redux/api/youtubeAPI'
import styles from './SearchPage.module.css'
import cn from 'classnames'
import {TITLE_BASE} from '../../../constants'

const SearchPage: React.FC = () => {
  const dispatch = useDispatch()
  const searchParams = useQuery()
  const currentQuery = searchParams.get('q')
  const sort = (searchParams.get('sort') as TSearchOrder) || ''
  const maxCount: number = Number(searchParams.get('maxCount')) || 12
  const isReadyToShow = useSelector((state: TRootState) => state.search.isReadyToShow)

  useEffect(() => {
    if (currentQuery) {
      document.title = `${TITLE_BASE} - поиск: ${currentQuery}`
    } else {
      document.title = `${TITLE_BASE} - Поиск`
    }
  }, [currentQuery])

  useEffect(() => {
    if (!currentQuery) return
    dispatch(onSearch(currentQuery, maxCount, sort))
  }, [currentQuery, dispatch, maxCount, sort])

  const searchColSpan = isReadyToShow ? 24 : 12
  return (
    <>
      <Row className={cn(styles.controlBox, {[styles.minified]: isReadyToShow})} justify='center' align='middle'>
        <Col span={searchColSpan}>
          <Row className={styles.titleBox} justify='center'>
            <h1 className={styles.title}>Поиск видео</h1>
          </Row>

          <Row justify='center'>
            <Search />
          </Row>
        </Col>
      </Row>

      {isReadyToShow && <VideoList />}
    </>
  )
}

export default SearchPage