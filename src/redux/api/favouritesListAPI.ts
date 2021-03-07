import {IFavouritesItem, IFavouritesItemToServer} from '../favourites/favouritesTypes'
import {fakeServer} from './fakeServer/fakeServer'
import {TResponse} from './userAPI'

type TFavouritesListAPI = {
  getList: (token: string) => Promise<TResponse<IFavouritesItem[]>>,
  addRecord: (token: string, record: IFavouritesItemToServer) => Promise<TResponse<{ id: string }>>,
  deleteRecord: (token: string, id: string) => Promise<TResponse<'ok'>>,
  editRecord: (token: string, newRecord: IFavouritesItem) => Promise<TResponse<'ok'>>
}

export const favouritesListAPI: TFavouritesListAPI = {
  getList: (token) => {
    return fakeServer.getFavouritesList(token)
  },

  addRecord: (token, record) => {
    return fakeServer.favouritesListAddRecord(token, record)
  },

  deleteRecord: (token, id) => {
    return fakeServer.favouritesListDeleteRecord(token, id)
  },

  editRecord: (token, newRecord) => {
    return fakeServer.favouritesListEditRecord(token, newRecord)
  }
}