import {
  TUserActions,
  USER_FETCHING_START,
  USER_FETCHING_FINISH,
  USER_SET_TOKEN
} from "./userTypes";
import {CLEAR_ALL_STATES} from "../shared/sharedTypes";
import {Reducer} from "redux";

const initialState = {
  isFetching: false as boolean,
  token: null as null | string,
}

type TUserReducerState = typeof initialState

const userReducer: Reducer<TUserReducerState, TUserActions> = (state = initialState, action): TUserReducerState => {
  switch (action.type) {
    case CLEAR_ALL_STATES:
      return initialState
    case USER_FETCHING_START:
      return {...state, isFetching: true}
    case USER_FETCHING_FINISH:
      return {...state, isFetching: false}
    case USER_SET_TOKEN:
      return {...state, token: action.payload.token}
    default: return state
  }
}

export default userReducer