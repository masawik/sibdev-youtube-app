import {ActionCreator} from "redux";
import {
  CLEAR_ERROR_MESSAGE,
  TUserClearErrorMessage,
  TUserFetchingFinish,
  TUserFetchingStart,
  TUserLoginData,
  TUserLoginError,
  TUserSetToken,
  TUserThunk,
  USER_FETCHING_FINISH,
  USER_FETCHING_START,
  USER_LOGIN_ERROR,
  USER_SET_TOKEN
} from "./userTypes";
import {userAPI} from "../api/userAPI";
import {localStorageUtils} from "../localStorageUtils";
import {sharedClearAllStates} from "../shared/sharedActions";

const userFetchingStart = (): TUserFetchingStart => ({type: USER_FETCHING_START})
const userFetchingFinish = (): TUserFetchingFinish => ({type: USER_FETCHING_FINISH})
const userSetToken = (token: string): TUserSetToken => ({type: USER_SET_TOKEN, payload: {token}})
const userLoginError = (errorMessage: string): TUserLoginError => ({
  type: USER_LOGIN_ERROR,
  errorMessage
})

export const onClearErrorMessage: ActionCreator<TUserClearErrorMessage> = () => ({type: CLEAR_ERROR_MESSAGE})

export const onUserInit = (): TUserThunk => async dispatch => {
  const token = localStorageUtils.getToken()
  if (!token) return
  
  dispatch(userFetchingStart())
  const result = await userAPI.isTokenValid(token)
  if (result.success && result.data) dispatch(userSetToken(token))
  dispatch(userFetchingFinish())
}

export const onUserLogin = (loginData: TUserLoginData): TUserThunk => async dispatch => {
  dispatch(userFetchingStart())
  const result = await userAPI.login(loginData)
  if (result.success) {
    const token = result.data
    localStorageUtils.setToken(token)
    dispatch(userSetToken(token))
    dispatch(userFetchingFinish())
  } else {
    dispatch(userLoginError(result.message))
  }
}

export const onUserLogout = (): TUserThunk => dispatch => {
  localStorageUtils.clearToken()
  dispatch(sharedClearAllStates())
}