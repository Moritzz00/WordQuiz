import { useState, useEffect } from "react"

export default function useGetData (filename) {
  const [data, setData] = useState(null)

    // get word list from file
    useEffect(() => {
      let ignore = false
  
      async function getData() {
        setData(null)
        const data = await fetch(`${process.env.PUBLIC_URL}/${filename}`)
        const asJson = await data.json()
        const asSet = new Set(asJson.words)
  
        if (!ignore) {
          setData(asSet)
        }
      }
  
      getData()
      return () => {
        ignore = true
      }
    }, [])
  
  return data
} 