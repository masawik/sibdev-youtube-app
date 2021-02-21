import {
  TVideoDrawerClose,
  TVideoDrawerOpen,
  VIDEO_DRAWER_CLOSE,
  VIDEO_DRAWER_OPEN,
} from './videoDrawerTypes'

export const onVideoDrawerOpen = (id: string): TVideoDrawerOpen => ({type: VIDEO_DRAWER_OPEN, payload: {id}})
export const onVideoDrawerClose = (): TVideoDrawerClose => ({type: VIDEO_DRAWER_CLOSE})

