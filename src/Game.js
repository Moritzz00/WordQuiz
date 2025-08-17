import { useEffect, useState } from 'react';
import { attempts, maxGuessLength } from './Constants';
import Keyboard from './Keyboard';
import Message from './Message';
import WordGuess from './Wordguess';
import useGetSecretWord from './useGetSecretWord';
import dayjs from 'dayjs';
import GameOverMessage from './GameOverMessage';


export default function Game({ data }) {
  const [message, setMessage] = useState('')
  const [messageClassName, setMessageClassName] = useState('')
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState(Array(attempts).fill(""))
  const [guessedCorrectly, setGuessedCorrectly] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [aloneGuessed, setAloneGuessed] = useState(false)
  const today = dayjs()


  let secretWord = useGetSecretWord(today, aloneGuessed);
  const secretWordSet = new Set(secretWord)
  const guessedLetters = new Set()
  for (let i = 0; i < turn; i++) {
    for (let j = 0; j < maxGuessLength; j++) {
      const guess = guesses[i]
      if (!secretWordSet.has(guess.charAt(j))) {
        guessedLetters.add(guess.charAt(j))
      }
    }
  }
  const currentGuess = guesses[turn]
  const messageAvailable = message.length > 0
  const messageTime = 1500

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


    if (currentGuess === secretWord) {
      setGuessedCorrectly(true)
      setMessage('You guessed correct!')
      setMessageClassName('winGameMessage')
    }


    if (!guessedCorrectly && (turn >= 5) && currentGuess !== secretWord) {
      setGameLost(true)
      setMessage("Unlucky! Try again tomorrow (or now :) )")
      setMessageClassName('loseGameMessage')
    }

    if (turn <= (attempts - 1)) {
      setTurn(turn + 1)
    };

  }

  if (!data || !secretWord) {
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
      <GameOverMessage aloneGuessed={aloneGuessed} today={today} display={guessedCorrectly || gameLost} won={guessedCorrectly} attempt={turn} />
      <div className='gameCTA'>
        Try to guess today's word!
      </div>
      <div className='gameContainer'>
        <WordGuess rowID={0} turn={turn} secretWord={secretWord} guess={guesses[0]} />
        <WordGuess rowID={1} turn={turn} secretWord={secretWord} guess={guesses[1]} />
        <WordGuess rowID={2} turn={turn} secretWord={secretWord} guess={guesses[2]} />
        <WordGuess rowID={3} turn={turn} secretWord={secretWord} guess={guesses[3]} />
        <WordGuess rowID={4} turn={turn} secretWord={secretWord} guess={guesses[4]} />
        <WordGuess rowID={5} turn={turn} secretWord={secretWord} guess={guesses[5]} />
        <Keyboard
          guessedLetters={guessedLetters}
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
            setAloneGuessed(true)
            return
          }}>
            Restart Game
          </button>
        }
      </div>


    </>
  )
}


