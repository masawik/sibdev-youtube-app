import React, {CSSProperties, useState} from 'react'
import {Col, Row} from "antd";
import Search from "./Search/Search";
import VideoList from "./VideoList/VideoList";

const SearchPage: React.FC = () => {
  const [isDisplayingResults, setIsDisplayingResults] = useState(true)

  // алиас чтоб строки влезали в экран
  const IDR = isDisplayingResults
  const searchRowStyles: CSSProperties = {
    minHeight: IDR ? 0 : '100vh',
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
            <Search isDisplayingResults={IDR}/>
          </Row>
        </Col>
      </Row>

      <VideoList/>
    </>
  )
}

export default SearchPage