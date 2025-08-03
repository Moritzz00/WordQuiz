import { useEffect, useRef } from "react";
import { haveSameContent } from "../lib/haveSameContent";

export const useRunOnChange = (effect, dependencies) => {
  const prevDeps = useRef(dependencies)
  console.log("current ref is", prevDeps.current)
  console.log("dependencies", dependencies )
  
  useEffect(() => {
    if (haveSameContent(prevDeps.current, dependencies)) return
    
    effect()
  }, [dependencies, effect])
}