import { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import WordGuess from './Wordguess';
import { maxGuessLength, attempts, SECRETWORD } from './Constants';


export default function Game() {
  const [data, setData] = useState(null)
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState(Array(attempts).fill(""))
  const currentGuess = guesses[turn]
  const guessedCorrectly = currentGuess === SECRETWORD

  useEffect(() => {
    let ignore = false

    async function getData() {
      setData(null)
      const data = await fetch('five_letter_words.json')
      const asJson = await data.json()
      const asSet = new Set(asJson.words)
      console.log("new Set", asSet)

      if (!ignore) {
        setData(asSet)
      }
    }

    getData()
    return () => {
      ignore = true
    }
  }, [])


  const handleKeyClick = (letter) => {
    if (currentGuess.length <= (maxGuessLength - 1)) {

      let newGuess = currentGuess + letter
      let updatedGuesses = [...guesses]
      updatedGuesses[turn] = newGuess

      setGuesses(updatedGuesses)
    }
  }

  const handleBackspace = () => {
    if (currentGuess.length > 0) {
      let newGuess = currentGuess.slice(0, currentGuess.length - 1)
      let updatedGuesses = [...guesses]
      updatedGuesses[turn] = newGuess

      setGuesses(updatedGuesses)
    }
  }


  const handleSubmit = () => {
    if (currentGuess.length < maxGuessLength) { return };

    if (turn <= (attempts - 1)) {
      if (turn <= (attempts - 1)) {
        setTurn(turn + 1)
      };
    }

    console.log("guessedCorrectly", guessedCorrectly)
    console.log("data", data)
  }

  if (!data) {
    return (
      <div className='loadingContainer'>
        <div className='loadingElement'>Loading...</div>
      </div>
    )
  }

  if (!guessedCorrectly) {
    return (
      <>
        You guessed correct!
        <button
          onClick={function () {
            setTurn(0)
            setGuesses(Array(attempts).fill(""))
            return
          }
          }
        >
          Restart Game
        </button>
      </>
    )
  }

  return (

    <div>
      <WordGuess modalOpener={open} id={0} turn={turn} guess={guesses[0]} />
      <WordGuess modalOpener={open} id={1} turn={turn} guess={guesses[1]} />
      <WordGuess modalOpener={open} id={2} turn={turn} guess={guesses[2]} />
      <WordGuess modalOpener={open} id={3} turn={turn} guess={guesses[3]} />
      <WordGuess modalOpener={open} id={4} turn={turn} guess={guesses[4]} />
      <WordGuess modalOpener={open} id={5} turn={turn} guess={guesses[5]} />
      <Keyboard
        handleKeyClick={handleKeyClick}
        handleBackspace={handleBackspace}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}


