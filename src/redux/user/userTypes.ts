import {ThunkAction} from 'redux-thunk'
import {TRootState} from '../rootReducer'
import {TSharedActions} from '../shared/sharedTypes'

export const USER_FETCHING_START = 'USER_FETCHING_START'
export const USER_FETCHING_FINISH = 'USER_FETCHING_FINISH'
export const USER_SET_TOKEN = 'USER_SET_TOKEN'

export type TUserFetchingStart = { type: typeof USER_FETCHING_START }
export type TUserFetchingFinish = { type: typeof USER_FETCHING_FINISH }
export type TUserSetToken = { type: typeof USER_SET_TOKEN, payload: { token: string } }

export type TUserLoginData = { login: string, password: string }

export type TUserActions =
  TUserFetchingStart
  | TUserFetchingFinish
  | TUserSetToken
  | TSharedActions

export type TUserThunk = ThunkAction<void, TRootState, unknown, TUserActions>