import {Reducer} from 'redux'
import {
  SEARCH_FETCHING_FINISH,
  SEARCH_FETCHING_START,
  SEARCH_SET_QUERY, SEARCH_SET_READY_TO_SHOW, SEARCH_SET_TOTAL_RESULTS,
  SEARCH_SET_VIDEOS,
  TSearchActions
} from './searchTypes'
import {IVideoItem} from '../api/youtubeAPI'
import {CLEAR_ALL_STATES} from '../shared/sharedTypes'

const initialState = {
  isFetching: false as boolean,
  query: null as string | null,
  totalResults: null as number | null,
  videos: null as null | IVideoItem[],
  isReadyToShow: false as boolean,
  errorMessage: null as null | string
}

type TSearchState = typeof initialState

const searchReducer: Reducer<TSearchState, TSearchActions> = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_FETCHING_START:
    return {...initialState, isFetching: true, isReadyToShow: state.isReadyToShow}
  case CLEAR_ALL_STATES:
    return initialState
  case SEARCH_SET_QUERY:
    return {...state, query: action.payload.query}
  case SEARCH_SET_READY_TO_SHOW:
    return {...state, isReadyToShow: true}
  case SEARCH_SET_TOTAL_RESULTS:
    return {...state, totalResults: action.payload.totalResults}
  case SEARCH_FETCHING_FINISH:
    return {...state, isFetching: false}
  case SEARCH_SET_VIDEOS:
    return {...state, videos: action.payload.videos}
  default: return state
  }
}

export default searchReducer