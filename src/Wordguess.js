import { enums, maxGuessLength } from "./Constants";

export default function WordGuess({ guess, turn, rowID, secretWord }) {
  // Fill the wordarray with the guess up to this point and fill with empty characters
  let wordArray = guess.split("")
  for (let i = guess.length; i < maxGuessLength; i++) {
    wordArray.push("")
  }

  // Iterate through the guess and color the letters according to their correctness
  let colorState = [enums.notGuessed, enums.notGuessed, enums.notGuessed, enums.notGuessed, enums.notGuessed];

  // Setup available letters
  const dict = new Map()
  for (let i = 0; i < secretWord.length; i++) {
    const currentLetter = secretWord.charAt(i)
    dict.set(currentLetter, (dict.get(currentLetter) ?? 0) + 1)
  }

  // Check for greens
  for (let i = 0; i < guess.length; i++) {
    const currentLetter = guess.charAt(i)
    if (currentLetter === secretWord.charAt(i)) {
      colorState[i] = enums.exact
      dict.set(currentLetter, dict.get(currentLetter) - 1)
    }
  }

  // Check for yellows
  for (let i = 0; i < guess.length; i++) {
    if (colorState[i] === enums.exact) {
      continue
    }
    const currentLetter = guess.charAt(i)
    const occurences = dict.get(currentLetter)
    if (occurences && occurences > 0) {
      colorState[i] = enums.contains
      dict.set(currentLetter, dict.get(currentLetter) - 1)
    } else {
      colorState[i] = enums.containsNot
    }
  }



  // Overwrite coloring of letters if the turn is still ongoing
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
