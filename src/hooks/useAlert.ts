import {useEffect} from "react";
import {useSelector} from "react-redux";
import {TRootState} from "../redux/rootReducer";
import { message as alert} from 'antd';

export const useAlert = () => {
  const message = useSelector((state: TRootState) => state.alert.message)
  const type = useSelector((state: TRootState) => state.alert.type)
  const duration = useSelector((state: TRootState) => state.alert.duration)

  useEffect(() => {
    if (!type || !duration || !message) return
    alert[type](message, duration)
  }, [duration, message, type])
}