import {CLEAR_ERROR_MESSAGE, TUserActions, USER_LOGIN_ERROR, USER_LOGIN_START, USER_LOGIN_SUCCESS} from "./userTypes";

const initialState = {
  isFetching: false as boolean,
  token: null as null | string,
  errorMessage: null as null | string
}

type TUserReducerState = typeof initialState

const userReducer = (state: TUserReducerState = initialState, action: TUserActions): TUserReducerState => {
  switch (action.type) {
    case USER_LOGIN_START:
      return {...state, isFetching: true}
    case USER_LOGIN_SUCCESS:
      return {isFetching: false, errorMessage: null, token: action.payload.token}
    case USER_LOGIN_ERROR:
      return {...state, isFetching: false, errorMessage: action.errorMessage}
    case CLEAR_ERROR_MESSAGE:
      return {...state, errorMessage: null}
    default: return state
  }
}

export default userReducer