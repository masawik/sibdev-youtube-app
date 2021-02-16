import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {Input, Popover} from "antd";
import {HeartOutlined, HeartTwoTone} from "@ant-design/icons/lib";
import styles from './Search.module.css'
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../../redux/rootReducer";
import {onFavouritesModalOpen} from "../../../../redux/favouritesModal/favouritesModalActions";

const HEARTH_ICON_COLOR = '#1390E5'

const $savedSuffixPopoverContent = (
  <div className={styles.popoverBox}>
    <div className={styles.popoverText}>Поиск сохранён в разделе «Избранное»</div>
    <Link to='/favourites'>Перейти в избранное</Link>
  </div>
)

const Search: React.FC = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const isFetching = useSelector((state: TRootState) => state.search.isFetching)
  const currentQuery = useSelector((state: TRootState) => state.search.query)
  const isReadyToShow = useSelector((state: TRootState) => state.search.isReadyToShow)
  const isSavedMessageVisible = useSelector((state: TRootState) => state.favourites.isSavedMessageVisible)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!currentQuery) return
    setQuery(currentQuery)
  }, [currentQuery])

  const submitHandler = useCallback(() => {
    history.push(`/search?q=${query}`)
  }, [history, query])

  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const onOpenModal = useCallback(() => {
    if (!currentQuery) return
    dispatch(onFavouritesModalOpen(currentQuery))
  }, [currentQuery, dispatch])

  const $suffix = (
    <Popover
      content={$savedSuffixPopoverContent}
      visible={isSavedMessageVisible}
      placement="bottom"
    >
      {
        isSavedMessageVisible
          ? <HeartTwoTone style={{color: HEARTH_ICON_COLOR}}/>
          : isReadyToShow
          ? <HeartOutlined onClick={onOpenModal} style={{color: HEARTH_ICON_COLOR}}/>
          : null
      }
    </Popover>
  )

  return (
    <Input.Search
      value={query}
      onChange={inputHandler}
      placeholder="Что хотите посмотреть?"
      enterButton="Найти"
      suffix={$suffix}
      onSearch={submitHandler}
      loading={isFetching}
      required
    />
  )
}

export default Search