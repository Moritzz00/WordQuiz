import { IoBackspaceOutline } from "react-icons/io5";

export default function Keyboard({ handleKeyClick, handleBackspace, handleSubmit, guessedLetters}) {
  
  const alphabet = Array.from("QWERTZUIOPASDFGHJKLYXCVBNM")
  return (
    <div className='keyboard'>
      <div className='keyboardRow'>
        {
          alphabet.slice(0, 10).map((l, i) => {
            let className = ''
            if (guessedLetters.has(l)) {
              className = 'containsNot'
            }
            return (<Key handleKeyClick={handleKeyClick} key={i} letter={l} className={className} />)
          })
        }
      </div>
      <div className='keyboardRow'>
        {
          alphabet.slice(10, 19).map((l, i) => {
            let className = ''
            if (guessedLetters.has(l)) {
              className = 'containsNot'
            }
            return (<Key handleKeyClick={handleKeyClick} key={i} letter={l} className={className} />)
          })
        }
        <Backspace onClick={handleBackspace} />
      </div>
      <div className='keyboardRow'>
        {
          alphabet.slice(19, 26).map((l, i) => {
            let className = ''
            if (guessedLetters.has(l)) {
              className = 'containsNot'
            }
            return (<Key handleKeyClick={handleKeyClick} key={i} letter={l} className={className} />)
          })
        }
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  )
}

function Key({ letter, handleKeyClick, className }) {
  return (
    <button
      onClick={() => handleKeyClick(letter)}
      className={`key ${className}`}>
      {letter}
    </button>)
}

function Backspace({ onClick }) {
  return <button className="key backspace" onClick={onClick}>{<IoBackspaceOutline size={"24px"} />}</button>
}

function SubmitButton({ onClick }) {
  return <button className="key submit" onClick={onClick}>Submit</button>
}