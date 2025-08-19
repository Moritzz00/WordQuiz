import { NavLink } from "react-router";
import dayjs from "dayjs";
import classes from './birthday.module.css'

export default function Home() {
  const today = dayjs()
  const birthdayToday = today.year(2025).month(7).date(21).format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
  return (
    <div>
      <p>  Today is the {today.format('DD')}. of {today.format('MMMM')} and that means: </p>
      {
        birthdayToday ?
          <BirthdayHome today={today} />
          :
          <StandardHome />
      }
    </div>
  )
}

function StandardHome() {
  return (
    <div>
      <h1>
        This is the standard home Site
      </h1>
      <nav>
        <NavLink to="/Game">
          To Game
        </NavLink>
      </nav>
    </div>
  )
}

function BirthdayHome() {
  const emojiClassNames = `${classes.game} ${classes.notImplemented}`
  return (
    <div >
      <div className={classes.birthdayHomeContainer}>
        <h1>
          🎉🎉🎉 Happy Birthday Emmaaa !!! 🎉🎉🎉
        </h1>
      </div>
      <div>
        <div className={classes.gameText}>
          Hier ist dein Geschenk:
        </div>

        <nav className={classes.game}>
          <NavLink to="/Game">
            🎁
          </NavLink>
        </nav>

        <div className={classes.gameText}>
          Im Moment ist es leider noch nicht so viel, aber ich hoffe du hast lange und viel Spaß hiermit 😊 
        </div>

        <div className={classes.textSeparator}>

        </div>
        <div className={classes.gameText}>
          Vielleicht tauchen hier noch mehr Sachen auf, wenn ich in Kanada bin ...
        </div>

        <nav className={emojiClassNames}>
          💡
        </nav>

        <nav className={emojiClassNames}>
          🔍
        </nav>

        <nav className={emojiClassNames}>
          🧮
        </nav>

        <nav className={emojiClassNames}>
          🎲
        </nav>

        <nav className={emojiClassNames}>
          🧩
        </nav>
      </div>
    </div>
  )
}