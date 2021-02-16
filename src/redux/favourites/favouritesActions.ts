import {
  FAVOURITES_ADD_RECORD,
  FAVOURITES_DELETE_RECORD,
  FAVOURITES_FETCHING_FINISH,
  FAVOURITES_FETCHING_START,
  FAVOURITES_SET_LIST,
  IFavouritesItem,
  IFavouritesItemToServer,
  TFavouritesAddRecord,
  TFavouritesDeleteRecord,
  TFavouritesFetchingFinish,
  TFavouritesFetchingStart,
  TFavouritesSetList,
  TFavouritesThunk
} from "./favouritesTypes";
import {favouritesListAPI} from "../api/favouritesListAPI";
import {onAlert} from "../shared/sharedActions";
import {
  favouritesModalFetchingFinish,
  favouritesModalFetchingStart,
  onFavouritesModalClose
} from "../favouritesModal/favouritesModalActions";

const favouritesFetchingStart = (): TFavouritesFetchingStart => ({type: FAVOURITES_FETCHING_START})
const favouritesFetchingFinish = (): TFavouritesFetchingFinish => ({type: FAVOURITES_FETCHING_FINISH})
const favouritesSetList = (favouritesList: IFavouritesItem[]): TFavouritesSetList => ({type: FAVOURITES_SET_LIST , payload: {favouritesList}})
const favouritesAddRecord = (record: IFavouritesItem): TFavouritesAddRecord => ({type: FAVOURITES_ADD_RECORD , payload: {record}})
const favouritesDeleteRecord = (id: string): TFavouritesDeleteRecord => ({type: FAVOURITES_DELETE_RECORD , payload: {id}})

export const onFavouritesListLoad = (): TFavouritesThunk => async (dispatch, getState) => {
  dispatch(favouritesFetchingStart())
  const token = getState().user.token
  if (token) {
    const result = await favouritesListAPI.getList(token)
    if (!result.success) {
      dispatch(onAlert(result.message, 'error'))
    }
    else {
      dispatch(favouritesSetList(result.data))
    }
  }
  dispatch(favouritesFetchingFinish())
}
//todo сделать обработчик общих ошибок
export const onFavouritesListAddRecord = (record: IFavouritesItemToServer): TFavouritesThunk => async (dispatch, getState) => {
  dispatch(favouritesModalFetchingStart())
  dispatch(favouritesFetchingStart())
  const token = getState().user.token
  if (!token) return
  const result = await favouritesListAPI.addRecord(token, record)
  if (result.success) {
    const fullRecord: IFavouritesItem = {...record, id: result.data.id}
    dispatch(favouritesAddRecord(fullRecord))
  } else dispatch(onAlert(result.message, 'error'))
  dispatch(favouritesModalFetchingFinish())
  dispatch(favouritesFetchingFinish())
  dispatch(onFavouritesModalClose())
  dispatch(onAlert('запись сохранена', 'success'))
}

export const onFavouritesListDeleteRecord = (id: string): TFavouritesThunk => async (dispatch, getState) => {
  dispatch(favouritesFetchingStart())
  const token = getState().user.token
  if (!token) return
  const result = await favouritesListAPI.deleteRecord(token, id)
  if (result.success) {
    dispatch(favouritesDeleteRecord(id))
  } else dispatch(onAlert(result.message, 'error'))
  dispatch(favouritesFetchingFinish())
}

export const onFavouritesListEditRecord = (record: IFavouritesItem): TFavouritesThunk => async (dispatch, getState) => {
  dispatch(favouritesFetchingStart())
  const token = getState().user.token
  if (!token) return
  const result = await favouritesListAPI.editRecord(token, record)
  if (result.success) {
    dispatch(onFavouritesModalClose())
    return dispatch(onFavouritesListLoad())
  } else dispatch(onAlert(result.message, 'error'))
  dispatch(favouritesFetchingFinish())
}