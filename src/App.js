import { useEffect, useState } from 'react';
import { attempts, maxGuessLength, SECRETWORD } from './Constants';
import Keyboard from './Keyboard';
import Message from './Message';
import WordGuess from './Wordguess';


export default function Game() {
  const [data, setData] = useState(null)
  const [message, setMessage] = useState('')
  const [messageClassName, setMessageClassName] = useState('')
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState(Array(attempts).fill(""))
  const [guessedCorrectly, setGuessedCorrectly] = useState(false)
  const [gameLost, setGameLost] = useState(false)

  const currentGuess = guesses[turn]
  const messageAvailable = message.length > 0
  const messageTime = 1500

  // get word list from file
  useEffect(() => {
    let ignore = false

    async function getData() {
      setData(null)
      const data = await fetch(`${process.env.PUBLIC_URL}/five_letter_words.json`)
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

  // handle showing timed message
  useEffect(() => {
    let timer;
    if (messageAvailable) {
      timer = setTimeout(() => {
        setMessage('')
        setMessageClassName('');
      }, messageTime);
    }
    return () => clearTimeout(timer);
  }, [messageAvailable, setMessage, setMessageClassName]);


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
    if (!data.has(currentGuess)) {

      setMessage('Guess not in word list.')
      setMessageClassName('wordNotFoundMessage')
      return
    }


    if (currentGuess === SECRETWORD) {
      setGuessedCorrectly(true)
      setMessage('You guessed correct!')
      setMessageClassName('winGameMessage')
    }


    if (!guessedCorrectly && (turn >= 5) && currentGuess !== SECRETWORD) {
      setGameLost(true)
      setMessage("Unlucky! Try again tomorrow (or now :) )")
      setMessageClassName('loseGameMessage')
    }

    if (turn <= (attempts - 1)) {
      setTurn(turn + 1)
    };

  }

  if (!data) {
    return (
      <div className='centeringContainer'>
        <div className='centeredElement'>Loading...</div>
      </div>
    )
  }

  return (
    <>
      {
        messageAvailable &&
        <Message className={messageClassName} text={message} />
      }

      <div className='gameContainer'>
        <WordGuess rowID={0} turn={turn} guess={guesses[0]} />
        <WordGuess rowID={1} turn={turn} guess={guesses[1]} />
        <WordGuess rowID={2} turn={turn} guess={guesses[2]} />
        <WordGuess rowID={3} turn={turn} guess={guesses[3]} />
        <WordGuess rowID={4} turn={turn} guess={guesses[4]} />
        <WordGuess rowID={5} turn={turn} guess={guesses[5]} />
        <Keyboard
          handleKeyClick={(gameLost || guessedCorrectly) ? () => { } : handleKeyClick}
          handleBackspace={(gameLost || guessedCorrectly) ? () => { } : handleBackspace}
          handleSubmit={(gameLost || guessedCorrectly) ? () => { } : handleSubmit}
        />

        {
          (guessedCorrectly || gameLost) &&
          <button className='resetButton' onClick={function () {
            setTurn(0)
            setGuesses(Array(attempts).fill(""))
            setGuessedCorrectly(false)
            setGameLost(false)
            return
          }}>
            Restart Game
          </button>
        }
      </div>


    </>
  )
}


