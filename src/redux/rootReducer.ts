import {combineReducers} from "redux";
import user from "./user/userReducer";
import search from "./search/searchReducer";
import alert from "./alert/alertReducer";

const rootReducer = combineReducers({
  user,
  search,
  alert
})

export type TRootState = ReturnType<typeof rootReducer>
export default rootReducer