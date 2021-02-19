import {
  SEARCH_FETCHING_FINISH,
  SEARCH_FETCHING_START,
  SEARCH_SET_QUERY,
  SEARCH_SET_READY_TO_SHOW,
  SEARCH_SET_TOTAL_RESULTS,
  SEARCH_SET_VIDEOS,
  TSearchFetchingFinish,
  TSearchFetchingStart,
  TSearchSetQuery,
  TSearchSetReadyToShow,
  TSearchSetTotalResults,
  TSearchSetVideos,
  TSearchThunk
} from './searchTypes'
import {TSearchOrder, youtubeSearchAPI, IVideoItem} from '../api/youtubeAPI'
import {onAlert} from '../shared/sharedActions'

const searchFetchingStart = (): TSearchFetchingStart => ({type: SEARCH_FETCHING_START})
const searchFetchingFinish = (): TSearchFetchingFinish => ({type: SEARCH_FETCHING_FINISH})
const searchSetReadyToShow = (): TSearchSetReadyToShow => ({type: SEARCH_SET_READY_TO_SHOW})
const searchSetVideos = (videos: IVideoItem[]): TSearchSetVideos => ({type: SEARCH_SET_VIDEOS, payload: {videos}})
const searchSetQuery = (query: string): TSearchSetQuery => ({type: SEARCH_SET_QUERY, payload: {query}})
const searchSetTotalResults = (totalResults: number): TSearchSetTotalResults => ({type: SEARCH_SET_TOTAL_RESULTS, payload: {totalResults}})





export const onSearch = (query: string, maxResults?: number, order?: TSearchOrder): TSearchThunk => async dispatch => {
  function error(error: string) {
    dispatch(searchFetchingFinish())
    return dispatch(onAlert(error, 'error'))
  }

  dispatch(searchFetchingStart())
  dispatch(searchSetQuery(query))
  const videosResult = await youtubeSearchAPI.search(query, maxResults, order)
  if (videosResult.error) return error(videosResult.error.message)

  const videoIds = videosResult.items.map(i => i.id.videoId)

  const videosStatResult = await youtubeSearchAPI.getVideoStat(videoIds)
  if (videosStatResult.error) return error(videosStatResult.error.message)

  const resultVideoList: IVideoItem[] = videosResult.items.map(i => {
    i.snippet.title = i.snippet.title.replaceAll('&amp;', '&')
    i.snippet.channelTitle = i.snippet.channelTitle.replaceAll('&amp;', '&')

    const id = i.id.videoId
    const [videoStat] = videosStatResult.items.filter(ivs => ivs.id === id)
    return {...i, views: Number(videoStat.statistics.viewCount)}
  })

  dispatch(searchSetTotalResults(videosResult.pageInfo.totalResults))
  dispatch(searchSetVideos(resultVideoList))
  dispatch(searchSetReadyToShow())
  dispatch(searchFetchingFinish())
}