import {combineReducers} from "redux";
import user from "./user/userReducer";
import search from "./search/searchReducer";

const rootReducer = combineReducers({
  user,
  search
})

export type TRootState = ReturnType<typeof rootReducer>
export default rootReducer