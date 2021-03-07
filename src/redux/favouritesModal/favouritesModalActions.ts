import {
  FAVOURITES_MODAL_CLOSE,
  FAVOURITES_MODAL_FETCHING_FINISH,
  FAVOURITES_MODAL_FETCHING_START,
  FAVOURITES_MODAL_FILL_DATA,
  FAVOURITES_MODAL_OPEN,
  TFavouritesModalClose,
  TFavouritesModalFetchingFinish,
  TFavouritesModalFetchingStart,
  TFavouritesModalFillData,
  TFavouritesModalOpen,
  TFavouritesModalThunk
} from './favouritesModalTypes'
import {TSearchOrder} from '../api/youtubeAPI'


export const favouritesModalFetchingStart = (): TFavouritesModalFetchingStart => ({type: FAVOURITES_MODAL_FETCHING_START})
export const favouritesModalFetchingFinish = (): TFavouritesModalFetchingFinish => ({type: FAVOURITES_MODAL_FETCHING_FINISH})
export const onFavouritesModalOpen = (query: string): TFavouritesModalOpen => ({type: FAVOURITES_MODAL_OPEN, payload: {query}})
export const onFavouritesModalClose = (): TFavouritesModalClose => ({type: FAVOURITES_MODAL_CLOSE})

const favouritesModalFillData = (
  sort: TSearchOrder,
  name: string,
  maxCount: number,
  id: string): TFavouritesModalFillData => ({
  type: FAVOURITES_MODAL_FILL_DATA,
  payload: {sort, name, maxCount, id}
})

export const onFavouritesModalOpenEdit = (id: string): TFavouritesModalThunk => (dispatch, getState) => {
  const state = getState()
  const [editingItem] = state.favourites.items.filter(i => i.id === id)
  dispatch(favouritesModalFillData(editingItem.sort, editingItem.name, editingItem.maxCount, editingItem.id))
  dispatch(onFavouritesModalOpen(editingItem.query))
}