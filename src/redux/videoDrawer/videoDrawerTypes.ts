export const VIDEO_DRAWER_OPEN = 'VIDEO_DRAWER_OPEN'
export const VIDEO_DRAWER_CLOSE = 'VIDEO_DRAWER_CLOSE'

export type TVideoDrawerOpen = {type: typeof VIDEO_DRAWER_OPEN, payload: {id: string}}
export type TVideoDrawerClose = {type: typeof VIDEO_DRAWER_CLOSE}

export type TVideoDrawerActions = TVideoDrawerOpen | TVideoDrawerClose