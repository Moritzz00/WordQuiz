import { NavLink } from "react-router";
import dayjs from "dayjs";
import classes from './Home.module.css';
import messageClasses from './GameOverMessage.module.css'
import { CloseButton } from './GameOverMessage'
import { useState } from "react";

export default function Home() {
  const today = dayjs()
  const birthdayToday = today.year(2025).month(7).date(21).format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
  return (
    <div>
      <p className={classes.date}>  Today is the {today.format('DD')}. of {today.format('MMMM')} and that means: </p>
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
  const emojiClassNames = `${classes.game} ${classes.notImplemented}`
  return (
    <div>
      <h1 className={classes.birthdayHomeContainer}>
        This is the standard home Site
      </h1>
      <div>
        <nav className={`${classes.game}`}>
          <NavLink to="/Game">
            🎁
          </NavLink>
        </nav>

        <div className={classes.textSeparator} />

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

function BirthdayHome() {
  const emojiClassNames = `${classes.game} ${classes.notImplemented}`
  return (
    <div>
      <div className={classes.birthdayHomeContainer}>
        <h1>
          🎉🎉🎉 Happy Birthday Emmaaa !!! 🎉🎉🎉
        </h1>
      </div>
      <div>
        <div className={classes.gameText}>
          Hier ist dein Geschenk:
        </div>

        <nav className={`${classes.game} ` + `${classes.hiThere}`}>
          <NavLink to="/Game">
            🎁
          </NavLink>
        </nav>

        <div className={classes.gameText}>
          Im Moment ist es leider noch nicht so viel, aber ich hoffe du hast lange und viel Spaß hiermit 😊
        </div>

        <div>
          <BouncingBook />
        </div>

        <div className={classes.textSeparator} />

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

function BouncingBook() {
  const [textOpen, setTextOpen] = useState(false)
  const [clicked, setClicked] = useState(false)

  const messageClassName = `${messageClasses.textMessage} ${textOpen ? '' : messageClasses.hidden}`
  const buttonClassName = `${messageClasses.closeButton} ${textOpen ? '' : messageClasses.hidden}`
  const bookIconClassName = `${classes.bouncingBook} ${clicked ? classes.clicked : ''}`

  function handleClick() {
    setTextOpen(!textOpen)
    setClicked(true)
  }

  const explanationText = 'Halloo, ich wollte dir noch zu dem Buch was ich dir geschenkt habe sagen, dass ich mir echt unsicher war ob das etwas passendes oder gutes ist. Nachdem ich das Buch gekauft habe, habe ich auch gemerkt, dass es ziemlich philosophisch und doch recht schwer zu lesen ist. Ich wollte dir nicht irgendetwas aufdrücken, sondern eher eine Inspiration geben. '
    + 'Na ja, ich hoffe Mal das hat geklappt. Wenn nicht kannst du vielleicht hier ein Bisschen relaxen :)'
  return (
    <>
      <div className={bookIconClassName} onClick={handleClick}>
        📔
      </div>
      {
        textOpen &&
        <div className={messageClassName}>
          <CloseButton className={buttonClassName} onClick={handleClick} />
          {explanationText}
        </div>
      }
    </>

  )
}