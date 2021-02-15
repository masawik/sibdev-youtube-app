import {
  TUserFetchingFinish,
  TUserFetchingStart,
  TUserLoginData,
  TUserSetToken,
  TUserThunk,
  USER_FETCHING_FINISH,
  USER_FETCHING_START,
  USER_SET_TOKEN,
} from "./userTypes";
import {userAPI} from "../api/userAPI";
import {localStorageUtils} from "../localStorageUtils";
import {onAlert, sharedClearAllStates} from "../shared/sharedActions";
import {onFavouritesListLoad} from "../favourites/favouritesActions";

const userFetchingStart = (): TUserFetchingStart => ({type: USER_FETCHING_START})
const userFetchingFinish = (): TUserFetchingFinish => ({type: USER_FETCHING_FINISH})
const userSetToken = (token: string): TUserSetToken => ({type: USER_SET_TOKEN, payload: {token}})

export const onUserInit = (): TUserThunk => dispatch => {
  const token = localStorageUtils.getToken()
  if (token) {
    dispatch(userSetToken(token))
    dispatch(onFavouritesListLoad())
  }
}

export const onUserLogin = (loginData: TUserLoginData): TUserThunk => async dispatch => {
  dispatch(userFetchingStart())

  const result = await userAPI.login(loginData)
  if (result.success) {
    const token = result.data
    localStorageUtils.setToken(token)
    dispatch(userSetToken(token))
  } else {
    dispatch(onAlert(result.message, 'error'))
  }

  dispatch(userFetchingFinish())
}

export const onUserLogout = (): TUserThunk => dispatch => {
  localStorageUtils.clearToken()
  dispatch(sharedClearAllStates())
}