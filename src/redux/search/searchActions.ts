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
} from "./searchTypes";
import {TSearchOrder, TVideoItem, youtubeSearchAPI} from "../api/youtubeAPI";

const searchFetchingStart = (): TSearchFetchingStart => ({type: SEARCH_FETCHING_START})
const searchFetchingFinish = (): TSearchFetchingFinish => ({type: SEARCH_FETCHING_FINISH})
const searchSetReadyToShow = (): TSearchSetReadyToShow => ({type: SEARCH_SET_READY_TO_SHOW})
const searchSetVideos = (videos: TVideoItem[]): TSearchSetVideos => ({type: SEARCH_SET_VIDEOS, payload: {videos}})
const searchSetQuery = (query: string): TSearchSetQuery => ({type: SEARCH_SET_QUERY, payload: {query}})
const searchSetTotalResults = (totalResults: number): TSearchSetTotalResults => ({type: SEARCH_SET_TOTAL_RESULTS, payload: {totalResults}})


export const onSearch = (query: string, maxResults?: number, order?: TSearchOrder): TSearchThunk => async dispatch => {
  dispatch(searchFetchingStart())
  dispatch(searchSetQuery(query))
  const result = await youtubeSearchAPI.search(query, maxResults, order)
  if (result.error) return false
  dispatch(searchSetTotalResults(result.pageInfo.totalResults))
  dispatch(searchSetVideos(result.items))
  dispatch(searchSetReadyToShow())
  dispatch(searchFetchingFinish())
}