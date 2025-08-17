import classes from './GameOverMessage.module.css'

export default function GameOverMessage({ display, won, attempt, today, aloneGuessed }) {
  const className = `${classes.textMessage} ${display ? '' : classes.hidden}`

  let specialBirthdayMessage = ''
  if (today.year(2025).month(7).date(21).format("YYYY-MM-DD") === today.format("YYYY-MM-DD") && !aloneGuessed) {
    specialBirthdayMessage = "Well that was easy :P Only today you can restart the game and a new word will be chosen as the secretword. Other than that the word changes once per day!"
  }

  let message = ''
  switch (attempt) {
    case 1:
      message = "WooooW, you did it on your first try ?! You must be a genius! 😇"
      break;
    case 2:
      message = "Second try ?! That is so impressive! Good job!🎉"
      break;
    case 3:
      message = "You did it on your third try! Great detective work 🔎"
      break;
    case 4:
      message = "Easy peasy on the fourth try! 🌟"
      break;
    case 5:
      message = "Niice, it took a while but you got there! Here is a cookie 🍪"
      break;
    case 6:
      message = "Phew, it was a close call, but you made it! Good job! 😮‍💨"
      break;
    default:
      message = "How did you get here? Very impressive, but I don't know what happened 😅 Anyway, please let me know and maybe send a screenshot :)"
  }

  return (
    <div>
      {
        won &&
        <div className={className}>
          <p>{message}</p>
          <p>{specialBirthdayMessage}</p>
        </div>
      }
      {
        !won &&
        <div className={className}>
          Oh no, you didn't make it 😭 You can try again or reveal the secret word.
        </div>
      }
    </div>
  )
}