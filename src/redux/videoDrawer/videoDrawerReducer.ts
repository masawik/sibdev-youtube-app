import {Reducer} from 'redux'
import {
  TVideoDrawerActions,
  VIDEO_DRAWER_CLOSE,
  VIDEO_DRAWER_OPEN,
} from './videoDrawerTypes'

const initialState = {
  isVisible: false as boolean,
  videoId: null as null | string
}

type TVideoDrawerState = typeof initialState

const videoDrawerReducer: Reducer<TVideoDrawerState, TVideoDrawerActions> = (state= initialState, action) => {
  switch (action.type) {
  case VIDEO_DRAWER_CLOSE:
    return {...state, isVisible: false}
  case VIDEO_DRAWER_OPEN:
    return {isVisible: true, videoId: action.payload.id}
  default: return state
  }
}

export default videoDrawerReducer