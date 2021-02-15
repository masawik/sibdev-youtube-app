import {ThunkAction} from "redux-thunk";
import {TRootState} from "../rootReducer";

export const CLEAR_ALL_STATES = 'CLEAR_ALL_STATES'
export const SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE'
export const CLEAR_ALERT_MESSAGE = 'CLEAR_ALERT_MESSAGE'
export type TSharedAlertTypes = 'success' | 'error' | 'warning'

export type TSharedClearAllStates = {type: typeof CLEAR_ALL_STATES}
export type TSharedSetAlertMessage = { type: typeof SET_ALERT_MESSAGE, payload: {message: string, type: TSharedAlertTypes, duration: number} }
export type TSharedClearAlertMessage = { type: typeof CLEAR_ALERT_MESSAGE }

export type TSharedActions = TSharedClearAllStates | TSharedSetAlertMessage | TSharedClearAlertMessage
export type TSharedThunk = ThunkAction<void, TRootState, unknown, TSharedActions>