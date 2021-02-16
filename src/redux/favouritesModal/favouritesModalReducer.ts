import {
  FAVOURITES_MODAL_CLOSE,
  FAVOURITES_MODAL_FETCHING_FINISH,
  FAVOURITES_MODAL_FETCHING_START,
  FAVOURITES_MODAL_FILL_DATA, FAVOURITES_MODAL_OPEN,
  TFavouritesModalActions
} from "./favouritesModalTypes";
import {CLEAR_ALL_STATES} from "../shared/sharedTypes";
import {Reducer} from "redux";
import {TSearchOrder} from "../api/youtubeAPI";

const initialState = {
  isFetching: false as boolean,
  isVisible: false as boolean,
  recordId: null as null | string,
  query: null as null | string,
  name: null as null | string,
  sort: '' as TSearchOrder,
  maxCount: 12 as number,
}

export type TFavouritesModalState = typeof initialState

const favouritesModalReducer: Reducer<TFavouritesModalState, TFavouritesModalActions> = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ALL_STATES:
      return initialState
    case FAVOURITES_MODAL_FETCHING_START:
      return {...state, isFetching: true}
    case FAVOURITES_MODAL_FETCHING_FINISH:
      return {...state, isFetching: false}
    case FAVOURITES_MODAL_OPEN:
      return {...state, isVisible: true, query: action.payload.query}
    case FAVOURITES_MODAL_CLOSE:
      return initialState
    case FAVOURITES_MODAL_FILL_DATA:
      const {maxCount, name, sort, id} = action.payload
      return {...state, maxCount, name, sort, recordId: id}
    default:
      return state
  }
}

export default favouritesModalReducer