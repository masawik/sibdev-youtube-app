import {combineReducers} from "redux";
import user from "./user/userReducer";

const rootReducer = combineReducers({
  user
})

export type TRootState = ReturnType<typeof rootReducer>
export default rootReducer