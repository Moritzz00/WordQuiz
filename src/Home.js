import { NavLink } from "react-router";

export default function Home() {
  return (
    <div>
      <h1>
        This is the home Site
      </h1>
      <nav>
        <NavLink to="/Game">
          To Game
        </NavLink>
      </nav>
    </div>
  )
}