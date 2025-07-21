import { enums,SECRETWORD,maxGuessLength } from "./Constants";

export default function WordGuess({ guess,turn,id,modalOpener }) {
  let size = guess.length
  let wordArray = guess.split("")
  for (let i = size; i < maxGuessLength; i++) {
    wordArray.push("")
  }

  let colorState = [enums.notGuessed, enums.notGuessed, enums.notGuessed, enums.notGuessed, enums.notGuessed];
  if (turn > id) {
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
  }

  if (colorState === Array(maxGuessLength).fill(enums.exact)) {
    modalOpener;
  }

  let name = "wordbox";
  if (turn === id) {
    name = name + " current"
  }

  return (
    <div className={name}>
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
      name = "letterbox submitted  exact"
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
    default:
      name = "letterbox"
  }

  return (
    <div className={name}>
      {letter}
    </div>
  )
}
