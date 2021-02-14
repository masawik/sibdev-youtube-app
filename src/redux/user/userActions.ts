import {ActionCreator} from "redux";
import {
  TUserLoginStart,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  TUserLoginSuccess,
  TUserLoginError, TUserThunk, TUserLoginData, TUserClearErrorMessage, CLEAR_ERROR_MESSAGE
} from "./userTypes";
import {userAPI} from "../api/userAPI";
import {localStorageUtils} from "../localStorageUtils";

const userLoginStart = (): TUserLoginStart => ({type: USER_LOGIN_START})
const userLoginSuccess = (token: string): TUserLoginSuccess => ({
  type: USER_LOGIN_SUCCESS,
  payload: {token}
})
const userLoginError = (errorMessage: string): TUserLoginError => ({
  type: USER_LOGIN_ERROR,
  errorMessage
})

export const onClearErrorMessage: ActionCreator<TUserClearErrorMessage> = () => ({type: CLEAR_ERROR_MESSAGE})

export const onLogin = (loginData: TUserLoginData): TUserThunk => async dispatch => {
  dispatch(userLoginStart())

  const result = await userAPI.login(loginData)

  if (result.success) {
    const token = result.data
    localStorageUtils.setToken(token)
    dispatch(userLoginSuccess(token))
  } else {
    dispatch(userLoginError(result.message))
  }
}