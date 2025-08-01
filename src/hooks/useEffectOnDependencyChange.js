import { useEffect, useRef } from "react";

export const useEffectOnDependencyChange = (effect, dependencies) => {
  const prevDeps = useRef(dependencies)

  useEffect(() => {
    const hasDepsChanged = !prevDeps.current.every((dep, i) => dep === dep[i])
    if (hasDepsChanged) {
      effect()
      prevDeps.current = dependencies
    }
  }, dependencies)
}