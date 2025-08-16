import { useState, useEffect } from "react"
import useGetData from "./useGetData"
import { POSSIBLE_SOLUTIONS } from "./Constants"
import Rand from "rand-seed"

export default function useGetSecretWord(today, aloneGuessed) {
  const data = useGetData(POSSIBLE_SOLUTIONS)
  const [secretWord, setSecretWord] = useState(null)

  useEffect(() => {
    if (data) {
      const items = Array.from(data)
      const randomWord = items[getRandomInt(0, items.length, today.format("YYYY-MM-DD"))]
      if (today.year(2025).month(7).date(21).format("YYYY-MM-DD") === today.format("YYYY-MM-DD") && !aloneGuessed) {
        setSecretWord("ALONE")
      } else {
        setSecretWord(randomWord)
      }
    }
  }, [data, secretWord, aloneGuessed, today])
  return secretWord
}

function getRandomInt(min, max, seed) {
  const rand = new Rand(seed)

  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(rand.next() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}