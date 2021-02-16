import {useSelector} from "react-redux";
import {TRootState} from "../redux/rootReducer";

export const useToken = () => {
  return useSelector((state: TRootState) => state.user.token)
}
