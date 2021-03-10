import React from 'react'
import {Drawer} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {TRootState} from '../../redux/rootReducer'
import {onVideoDrawerClose} from '../../redux/videoDrawer/videoDrawerActions'

const VideoDrawer: React.FC = () => {
  const dispatch = useDispatch()
  const {videoId, isVisible} = useSelector((state: TRootState) => state.videoDrawer)

  const onClose = () => {
    dispatch(onVideoDrawerClose())
  }

  return (
    <Drawer
      placement='bottom'
      onClose={onClose}
      visible={isVisible}
      destroyOnClose={true}
      bodyStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      height='80vh'
    >
      <iframe width="889" height="500" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen/>
    </Drawer>
  )
}

export default VideoDrawer