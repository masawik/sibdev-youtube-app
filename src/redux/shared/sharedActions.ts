import {
  CLEAR_ALERT_MESSAGE,
  CLEAR_ALL_STATES,
  SET_ALERT_MESSAGE,
  TSharedAlertTypes,
  TSharedClearAlertMessage,
  TSharedClearAllStates,
  TSharedSetAlertMessage, TSharedThunk
} from './sharedTypes'

export const sharedClearAllStates = (): TSharedClearAllStates => ({type: CLEAR_ALL_STATES})
const sharedShowErrorMessage = (message: string, type: TSharedAlertTypes, duration: number): TSharedSetAlertMessage => ({
  type: SET_ALERT_MESSAGE,
  payload: {message, type, duration}
})
const sharedClearAlertMessage = (): TSharedClearAlertMessage => ({type: CLEAR_ALERT_MESSAGE})

export const onAlert = (message: string, type: TSharedAlertTypes, duration?: number): TSharedThunk => dispatch => {
  if (!duration) duration = 1.5
  dispatch(sharedShowErrorMessage(message, type, duration))
  setTimeout(() => {
    dispatch(sharedClearAlertMessage())
  }, duration)
}