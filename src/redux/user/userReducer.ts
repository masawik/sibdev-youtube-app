import {
  CLEAR_ERROR_MESSAGE,
  TUserActions,
  USER_LOGIN_ERROR,
  USER_FETCHING_START,
  USER_FETCHING_FINISH,
  USER_SET_TOKEN
} from "./userTypes";
import {CLEAR_ALL_STATES} from "../shared/sharedTypes";

const initialState = {
  isFetching: false as boolean,
  token: null as null | string,
  errorMessage: null as null | string
}

type TUserReducerState = typeof initialState

const userReducer = (state: TUserReducerState = initialState, action: TUserActions): TUserReducerState => {
  switch (action.type) {
    case CLEAR_ALL_STATES:
      return initialState
    case USER_FETCHING_START:
      return {...state, isFetching: true}
    case USER_FETCHING_FINISH:
      return {...state, isFetching: false}
    case USER_SET_TOKEN:
      return {...state, token: action.payload.token}
    case USER_LOGIN_ERROR:
      return {...state, isFetching: false, errorMessage: action.errorMessage}
    case CLEAR_ERROR_MESSAGE:
      return {...state, errorMessage: null}
    default: return state
  }
}

export default userReducer