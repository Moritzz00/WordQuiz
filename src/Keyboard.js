import { IoBackspaceOutline } from "react-icons/io5";

export default function Keyboard({ handleKeyClick, handleBackspace, handleSubmit }) {
  const alphabet = Array.from("QWERTZUIOPASDFGHJKLYXCVBNM")
  return (
    <div className='keyboard'>
      <div className='keyboardRow'>
        {
          alphabet.slice(0, 10).map((l, i) => <Key handleKeyClick={handleKeyClick} key={i} letter={l} />)
        }
      </div>
      <div className='keyboardRow'>
        {
          alphabet.slice(10, 19).map((l, i) => <Key handleKeyClick={handleKeyClick} key={i} letter={l} />)
        }
        <Backspace onClick={handleBackspace} />
      </div>
      <div className='keyboardRow'>
        {
          alphabet.slice(19, 26).map((l, i) => <Key handleKeyClick={handleKeyClick} key={i} letter={l} />)
        }
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  )
}

function Key({ letter, handleKeyClick }) {
  return (
    <button
      onClick={() => handleKeyClick(letter)}
      className="key">
      {letter}
    </button>)
}

function Backspace({ onClick }) {
  return <button className="key backspace" onClick={onClick}>{<IoBackspaceOutline size={"24px"}/>}</button>
}

function SubmitButton({ onClick }) {
  return <button className="key submit" onClick={onClick}>Submit</button>
}