import {TSharedActions} from "../shared/sharedTypes"
import {TSearchOrder} from "../api/youtubeAPI"
import {ThunkAction} from "redux-thunk"
import {TRootState} from "../rootReducer"

export const FAVOURITES_MODAL_OPEN = 'FAVOURITES_MODAL_OPEN'
export const FAVOURITES_MODAL_CLOSE = 'FAVOURITES_MODAL_CLOSE'
export const FAVOURITES_MODAL_FETCHING_START = 'FAVOURITES_MODAL_FETCHING_START'
export const FAVOURITES_MODAL_FETCHING_FINISH = 'FAVOURITES_MODAL_FETCHING_FINISH'
export const FAVOURITES_MODAL_FILL_DATA = 'FAVOURITES_MODAL_FILL_DATA'

export type TFavouritesModalOpen = { type: typeof FAVOURITES_MODAL_OPEN, payload: {query: string} }
export type TFavouritesModalClose = { type: typeof FAVOURITES_MODAL_CLOSE }
export type TFavouritesModalFetchingStart = { type: typeof FAVOURITES_MODAL_FETCHING_START }
export type TFavouritesModalFetchingFinish = { type: typeof FAVOURITES_MODAL_FETCHING_FINISH }
export type TFavouritesModalFillData = {
  type: typeof FAVOURITES_MODAL_FILL_DATA, payload: {
    name: string,
    sort: TSearchOrder,
    maxCount: number,
    id: string
  }
}

export type TFavouritesModalActions =
  | TFavouritesModalOpen
  | TFavouritesModalClose
  | TFavouritesModalFetchingStart
  | TFavouritesModalFetchingFinish
  | TSharedActions
  | TFavouritesModalFillData
export type TFavouritesModalThunk = ThunkAction<void, TRootState, unknown, TFavouritesModalActions>