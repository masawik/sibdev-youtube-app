import {localStorageUtils} from "../redux/localStorageUtils"
import {useSelector} from "react-redux"
import {TRootState} from "../redux/rootReducer"
import {useCallback} from "react"

export const useToken = () => {
  const storeToken = useSelector((state: TRootState) => state.user.token)

  const getToken = useCallback(() => {
    return storeToken ? storeToken : localStorageUtils.getToken()
  }, [storeToken])

  const token = getToken()
  return [token]
}
