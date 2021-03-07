import {IFavouritesItem} from '../../favourites/favouritesTypes'
const TOKEN_BY_LOGIN = 'TOKEN_BY_LOGIN'
const DB_FAVOURITES_LISTS = 'DB_FAVOURITES_LISTS'

type TUsersDB = {
  [key: string]: string
}

type TFavouritesListsDB = {
  [key: string]: IFavouritesItem[]
}

type TLsDB = {
  addUserToken: (login: string, token: string) => void,
  getLoginByToken: (token: string) => string | false,
  getFavouritesList: (login: string) => IFavouritesItem[],
  favouritesListUpdate: (login: string, list: IFavouritesItem[]) => void,
  favouritesListAddRecord: (login: string, record: IFavouritesItem) => void,
  favouritesListDeleteRecord: (login: string, id: string) => void,
  favouritesListEditRecord: (login: string, record: IFavouritesItem) => void,
}

export const lsDB: TLsDB = {
  addUserToken: (login, token) => {
    const newStateItem = {[login]: token}
    const prevStateStr = localStorage.getItem(TOKEN_BY_LOGIN)
    const newStateObj = prevStateStr ? {...JSON.parse(prevStateStr), ...newStateItem} : {...newStateItem}
    const newStateStr = JSON.stringify(newStateObj)
    localStorage.setItem(TOKEN_BY_LOGIN, newStateStr)
  },

  getLoginByToken: (token) => {
    const DbStr = localStorage.getItem(TOKEN_BY_LOGIN)
    if (!DbStr) return false
    const Db: TUsersDB = JSON.parse(DbStr)
    for (const record of Object.entries(Db)) {
      if (token === record[1]) {
        return record[0]
      }
    }
    return false
  },

  getFavouritesList: (login) => {
    const favouritesListsDbStr = localStorage.getItem(DB_FAVOURITES_LISTS)
    if (!favouritesListsDbStr) return []
    const favouritesListsDb: TFavouritesListsDB = JSON.parse(favouritesListsDbStr)
    if (!favouritesListsDb[login]) return []
    return favouritesListsDb[login]
  },

  favouritesListUpdate: (login, list) => {
    const favouritesListsDbStr = localStorage.getItem(DB_FAVOURITES_LISTS)
    let newLists: TFavouritesListsDB = {}
    if (favouritesListsDbStr) {
      newLists = {...newLists, ...JSON.parse(favouritesListsDbStr)}
    }
    newLists = {...newLists, [login]: list}
    localStorage.setItem(DB_FAVOURITES_LISTS, JSON.stringify(newLists))
  },

  favouritesListAddRecord: (login, record) => {
    const prevList: IFavouritesItem[] = lsDB.getFavouritesList(login)
    const newList = [...prevList, record]
    lsDB.favouritesListUpdate(login, newList)
  },

  favouritesListDeleteRecord: (login, id) => {
    const prevList: IFavouritesItem[] = lsDB.getFavouritesList(login)
    const newList = prevList.filter(i => i.id !== id)
    lsDB.favouritesListUpdate(login, newList)
  },

  favouritesListEditRecord: (login, record) => {
    const favList: IFavouritesItem[] = lsDB.getFavouritesList(login)
    const newList = favList.map((i) => {
      if (i.id === record.id) return record
      return i
    })
    lsDB.favouritesListUpdate(login, newList)
  }
}