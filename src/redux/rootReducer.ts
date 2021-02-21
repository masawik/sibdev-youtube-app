import {combineReducers} from 'redux'
import user from './user/userReducer'
import search from './search/searchReducer'
import alert from './alert/alertReducer'
import favourites from './favourites/favouritesReducer'
import favouritesModal from './favouritesModal/favouritesModalReducer'
import videoDrawer from './videoDrawer/videoDrawerReducer'

const rootReducer = combineReducers({
  user,
  search,
  alert,
  favourites,
  favouritesModal,
  videoDrawer
})

export type TRootState = ReturnType<typeof rootReducer>
export default rootReducer