import { NavLink } from "react-router";
import dayjs from "dayjs";

export default function Home() {
  const today = dayjs()
  const birthdayToday = today.year(2025).month(7).date(21).format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
  return (
    <div>
      {
      birthdayToday ?
      <BirthdayHome/>
      :
      <StandardHome/>
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
  return (
    <div>

    </div>
  )
}