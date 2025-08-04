import { enums, SECRETWORD, maxGuessLength } from "./Constants";

export default function WordGuess({ guess, turn, rowID }) {
  let wordArray = guess.split("")
  for (let i = guess.length; i < maxGuessLength; i++) {
    wordArray.push("")
  }

  let colorState = [enums.notGuessed, enums.notGuessed, enums.notGuessed, enums.notGuessed, enums.notGuessed];

  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) === SECRETWORD.charAt(i)) {
      colorState[i] = enums.exact
    } else {
      for (let j = 0; j < SECRETWORD.length; j++) {
        if (guess.charAt(i) === SECRETWORD.charAt(j)) {
          colorState[i] = enums.contains
          break;
        }
      }
    }
    if (colorState[i] === enums.notGuessed) {
      colorState[i] = enums.containsNot
    }
  }
  
  if (turn === rowID) {
    for (let i = 0; i < guess.length; i++) {
      if (guess.charAt(i) !== '') {
        colorState[i] = enums.typed
      }
    }
  }

  return (
    <div className={'wordbox'}>
      {
        wordArray.map((l, i) => { return <Letterbox key={i} color={colorState[i]} letter={l} /> })
      }
    </div>
  )
}


function Letterbox({ letter, color }) {
  let name;
  switch (color) {
    case enums.exact:
      name = "letterbox submitted exact"
      break;
    case enums.contains:
      name = "letterbox submitted contains"
      break;
    case enums.containsNot:
      name = "letterbox submitted containsNot"
      break;
    case enums.notGuessed:
      name = "letterbox notGuessed"
      break;
    case enums.typed:
      name = "letterbox typed"
      break;
    default:
      name = "letterbox"
  }

  return (
    <div className={name}>
      {letter}
    </div>
  )
}
