import { useEffect, useState } from "react";

export const useTimeoutState = (defaultValue, timeoutDuration) => {
  const [state, setState] = useState(defaultValue)

  useEffect(() => {
    if (state !== defaultValue) {
      const timeout = setTimeout(() => {
        setState(defaultValue)
      }, timeoutDuration)

      return () => clearTimeout(timeout)
    }
  }, [state, defaultValue, setState, timeoutDuration])

  return [state, setState]
}