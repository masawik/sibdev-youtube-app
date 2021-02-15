import React, {ChangeEvent, useEffect, useState} from 'react'
import {Input, Popover} from "antd";
import {HeartOutlined, HeartTwoTone} from "@ant-design/icons/lib";
import styles from './Search.module.css'
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../../redux/rootReducer";
import {onFavouritesModalOpen} from "../../../../redux/favouritesModal/favouritesModalActions";

const HEARTH_ICON_COLOR = '#1390E5'

const Search: React.FC = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const isFetching = useSelector((state: TRootState) => state.search.isFetching)
  const currentQuery = useSelector((state: TRootState) => state.search.query)
  const isReadyToShow = useSelector((state: TRootState) => state.search.isReadyToShow)
  const [query, setQuery] = useState('')
  const [isSavedMessageVisible, setIsSavedMessageVisible] = useState(false)

  useEffect(() => {
    if (!currentQuery) return
    setQuery(currentQuery)
  }, [currentQuery])

  const submitHandler = () => {
    history.push(`/search?q=${query}`)
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onOpenModal = () => {
    if (!currentQuery) return
    dispatch(onFavouritesModalOpen(currentQuery))
  }

  const $savedSuffixPopoverContent = (
    <div className={styles.popoverBox}>
      <div className={styles.popoverText}>Поиск сохранён в разделе «Избранное»</div>
      <a>Перейти в избранное</a>
    </div>
  )
  const $savedSuffix = (
    <Popover
      content={$savedSuffixPopoverContent}
      visible={true}
      placement="bottom"
    >
      <HeartTwoTone twoToneColor={HEARTH_ICON_COLOR}/>
    </Popover>
  )
  const $suffix = isSavedMessageVisible ? $savedSuffix : <HeartOutlined onClick={onOpenModal} style={{color: HEARTH_ICON_COLOR}}/>

  return (
    <Input.Search
      value={query}
      onChange={inputHandler}
      placeholder="Что хотите посмотреть?"
      enterButton="Найти"
      suffix={isReadyToShow ? $suffix : null}
      onSearch={submitHandler}
      loading={isFetching}
      required
    />
  )
}

export default Search