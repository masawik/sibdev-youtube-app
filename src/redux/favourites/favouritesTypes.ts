import {TSharedActions} from "../shared/sharedTypes";

export const SET_LIST = 'SET_LIST'
export const ADD_RECORD = 'ADD_RECORD'
export const DELETE_RECORD = 'DELETE_RECORD'

export type TFavouritesSetList = {type: typeof SET_LIST}
export type TFavouritesAddRecord = {type: typeof ADD_RECORD}
export type TFavouritesDeleteRecord = {type: typeof DELETE_RECORD}

export type TFavouritesActions = TFavouritesSetList | TFavouritesAddRecord | TFavouritesDeleteRecord | TSharedActions