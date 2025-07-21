import { useState } from 'react';
import Keyboard from './Keyboard';
import WordGuess from './Wordguess';
import { maxGuessLength,attempts } from './Constants';

export default function Game() {
  const [turn, setTurn] = useState(0);

  const [guesses, setGuesses] = useState(Array(attempts).fill(""))
  const currentGuess = guesses[turn]

  const handleKeyClick = (letter) => {
    if (currentGuess.length <= (maxGuessLength-1) ) {

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

    if (turn <= (attempts-1)) {
      setTurn(turn + 1)
    };
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



