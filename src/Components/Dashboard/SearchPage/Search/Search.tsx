import React, {ChangeEvent, useState} from 'react'
import {Input, Popover} from "antd";
import {HeartOutlined, HeartTwoTone} from "@ant-design/icons/lib";
import styles from './Search.module.css'

const HEARTH_ICON_COLOR = '#1390E5'

type TSearchProps = {
  isDisplayingResults: boolean
}

const Search: React.FC<TSearchProps> = ({isDisplayingResults}) => {
  const [query, setQuery] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [isSavedMessageVisible, setIsSavedMessageVisible] = useState(true)

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

  const suffix = isSavedMessageVisible ? $savedSuffix : <HeartOutlined style={{color: HEARTH_ICON_COLOR}}/>

  const submitHandler = () => {
    console.log(query)
    setIsFetching(true)
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Input.Search
      value={query}
      onChange={inputHandler}
      placeholder="Что хотите посмотреть?"
      enterButton="Найти"
      suffix={isDisplayingResults ? suffix : null}
      onSearch={submitHandler}
      loading={isFetching}
    />
  )
}

export default Search