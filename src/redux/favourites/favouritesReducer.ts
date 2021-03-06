import {Reducer} from 'redux'
import {
  FAVOURITES_ADD_RECORD, FAVOURITES_DELETE_RECORD,
  FAVOURITES_FETCHING_FINISH,
  FAVOURITES_FETCHING_START,
  FAVOURITES_SET_LIST,
  TFavouritesActions,
  IFavouritesItem
} from './favouritesTypes'
import {CLEAR_ALL_STATES} from '../shared/sharedTypes'
import {SEARCH_FETCHING_START} from '../search/searchTypes'

const initialState = {
  isFetching: false as boolean,
  items: [] as IFavouritesItem[],
  isSavedMessageVisible: false as boolean
}

type TFavouritesState = typeof initialState

const favouritesReducer: Reducer<TFavouritesState, TFavouritesActions> = (state = initialState, action) => {
  switch (action.type) {
  case CLEAR_ALL_STATES:
    return initialState
  case FAVOURITES_FETCHING_START:
    return {...state, isFetching: true}
  case FAVOURITES_FETCHING_FINISH:
    return {...state, isFetching: false}
  case FAVOURITES_SET_LIST:
    return {...state, items: action.payload.favouritesList}
  case FAVOURITES_ADD_RECORD:
    return {...state, items: [...state.items, action.payload.record], isSavedMessageVisible: true}
  case FAVOURITES_DELETE_RECORD:
    const filteredList = state.items.filter((i) => i.id !== action.payload.id)
    return {...state, items: filteredList}
  case SEARCH_FETCHING_START:
    return {...state, isSavedMessageVisible: false}
  default: return state
  }
}

export default favouritesReducer