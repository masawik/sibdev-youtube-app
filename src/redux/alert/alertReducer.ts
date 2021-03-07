import {
  CLEAR_ALERT_MESSAGE,
  CLEAR_ALL_STATES,
  SET_ALERT_MESSAGE,
  TSharedActions,
  TSharedAlertTypes
} from '../shared/sharedTypes'
import {Reducer} from 'redux'

const initialState = {
  message: null as null | string,
  type: null as null | TSharedAlertTypes,
  duration: null as null | number
}

type TAlertState = typeof initialState

const alertReducer: Reducer<TAlertState, TSharedActions> = (state = initialState, action) => {
  switch (action.type) {
  case SET_ALERT_MESSAGE:
    return {message: action.payload.message, type: action.payload.type, duration: action.payload.duration}
  case CLEAR_ALERT_MESSAGE:
    return initialState
  case CLEAR_ALL_STATES:
    return initialState
  default: return state
  }
}

export default alertReducer