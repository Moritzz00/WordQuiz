import { useRunOnChange } from "./hooks/useRunOnChange";
import { useTimeoutState } from "./hooks/useTimeoutState";


export const TimeoutMessage = ({ render, timeout, message }) => {
  const [showMessage, setShowMessage] = useTimeoutState(false, timeout)

  useRunOnChange(() => {
    setShowMessage(true)
  }, message)

  

  return showMessage ? <>{render()}</> : null
}