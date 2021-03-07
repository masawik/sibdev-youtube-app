import {TSharedActions} from '../shared/sharedTypes'
import {TSearchOrder} from '../api/youtubeAPI'
import {ThunkAction} from 'redux-thunk'
import {TRootState} from '../rootReducer'
import {
  TFavouritesModalClose,
  TFavouritesModalFetchingFinish,
  TFavouritesModalFetchingStart
} from '../favouritesModal/favouritesModalTypes'
import {TSearchFetchingStart} from '../search/searchTypes'

export const FAVOURITES_FETCHING_START = 'FAVOURITES_FETCHING_START'
export const FAVOURITES_FETCHING_FINISH = 'FAVOURITES_FETCHING_FINISH'
export const FAVOURITES_SET_LIST = 'FAVOURITES_SET_LIST'
export const FAVOURITES_ADD_RECORD = 'FAVOURITES_ADD_RECORD'
export const FAVOURITES_DELETE_RECORD = 'FAVOURITES_DELETE_RECORD'

//обьект для отправки на сервер. без id
export interface IFavouritesItemToServer {
  query: string,
  name: string,
  sort: TSearchOrder
  maxCount: number
}

//полноценный обьект с полученным от сервера id
export interface IFavouritesItem extends IFavouritesItemToServer {
  id: string
}

export type TFavouritesFetchingStart = { type: typeof FAVOURITES_FETCHING_START }
export type TFavouritesFetchingFinish = { type: typeof FAVOURITES_FETCHING_FINISH }
export type TFavouritesSetList = { type: typeof FAVOURITES_SET_LIST, payload: {favouritesList: IFavouritesItem[]}}
export type TFavouritesAddRecord = { type: typeof FAVOURITES_ADD_RECORD, payload: {record: IFavouritesItem} }
export type TFavouritesDeleteRecord = { type: typeof FAVOURITES_DELETE_RECORD, payload: {id: string} }

export type TFavouritesActions =
  TFavouritesSetList
  | TFavouritesAddRecord
  | TFavouritesDeleteRecord
  | TSharedActions
  | TFavouritesFetchingStart
  | TFavouritesFetchingFinish
  | TFavouritesModalFetchingStart
  | TFavouritesModalFetchingFinish
  | TFavouritesModalClose
  | TSearchFetchingStart
export type TFavouritesThunk = ThunkAction<void, TRootState, unknown, TFavouritesActions>