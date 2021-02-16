import React, {CSSProperties, useEffect} from 'react'
import {Col, Row} from "antd"
import Search from "./Search/Search"
import VideoList from "./VideoList/VideoList"
import {useQuery} from "../../../hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {onSearch} from "../../../redux/search/searchActions";
import {TSearchOrder} from "../../../redux/api/youtubeAPI";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch()
  const searchParams = useQuery()
  const currentQuery = searchParams.get('q')
  const sort = (searchParams.get('sort') as TSearchOrder) || ''
  const maxCount: number = Number(searchParams.get('maxCount')) || 12
  const isReadyToShow = useSelector((state: TRootState) => state.search.isReadyToShow)

  useEffect(() => {
    if (!currentQuery) return
    dispatch(onSearch(currentQuery, maxCount, sort))
  }, [currentQuery, dispatch, maxCount, sort])

  // алиас чтоб строки влезали в экран
  const IDR = isReadyToShow
  const searchRowStyles: CSSProperties = {
    minHeight: IDR ? 0 : 'calc(100vh - 80px)',
    margin: IDR ? '40px 0 25px' : 0,
  }
  const searchColSpan = IDR ? 24 : 12
  const titleBoxStyles: CSSProperties = {
    marginBottom: IDR ? '12px' : '40px',
    justifyContent: IDR ? 'start' : 'center'
  }
  const titleStyles: CSSProperties = {
    fontSize: IDR ? '28px' : '36px'
  }

  return (
    <>
      <Row style={searchRowStyles} justify='center' align='middle'>
        <Col span={searchColSpan}>
          <Row style={titleBoxStyles} justify='center'>
            <h1 style={titleStyles}>Поиск видео</h1>
          </Row>

          <Row justify='center'>
            <Search />
          </Row>
        </Col>
      </Row>

      {IDR && <VideoList />}
    </>
  )
}

export default SearchPage