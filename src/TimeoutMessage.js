import { useEffectOnDependencyChange } from "./hooks/useEffectOnDependencyChange";
import { useTimeoutState } from "./hooks/useTimeoutState";

export const TimeoutMessage = (render, timeout, dependencies) => {
  const [showMessage, setShowMessage] = useTimeoutState(
    false, 
    timeout
  )

  useEffectOnDependencyChange(() => {
    setShowMessage(true)
  }, dependencies)

  return showMessage ? <>{render()}</> : null
}