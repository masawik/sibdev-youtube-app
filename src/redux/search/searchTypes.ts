import {TVideoItem} from "../api/youtubeAPI";
import {ThunkAction} from "redux-thunk";
import {TRootState} from "../rootReducer";
import {TSharedActions} from "../shared/sharedTypes";

export const SEARCH_FETCHING_START = 'SEARCH_FETCHING_START'
export const SEARCH_FETCHING_FINISH = 'SEARCH_FETCHING_FINISH'
export const SEARCH_SET_VIDEOS = 'SEARCH_SET_VIDEOS'
export const SEARCH_SET_QUERY = 'SEARCH_SET_QUERY'
export const SEARCH_SET_TOTAL_RESULTS = 'SEARCH_SET_TOTAL_RESULTS'
export const SEARCH_SET_READY_TO_SHOW = 'SEARCH_SET_READY_TO_SHOW'

export type TSearchFetchingStart = { type: typeof SEARCH_FETCHING_START }
export type TSearchFetchingFinish = { type: typeof SEARCH_FETCHING_FINISH }
export type TSearchSetReadyToShow = { type: typeof SEARCH_SET_READY_TO_SHOW }
export type TSearchSetQuery = { type: typeof SEARCH_SET_QUERY, payload: { query: string } }
export type TSearchSetTotalResults = { type: typeof SEARCH_SET_TOTAL_RESULTS, payload: { totalResults: number } }
export type TSearchSetVideos = { type: typeof SEARCH_SET_VIDEOS, payload: { videos: TVideoItem[] } }

export type TSearchActions =
  TSearchFetchingStart
  | TSearchFetchingFinish
  | TSearchSetVideos
  | TSearchSetQuery
  | TSearchSetTotalResults
  | TSearchSetReadyToShow
  | TSharedActions

export type TSearchThunk = ThunkAction<void, TRootState, unknown, TSearchActions>