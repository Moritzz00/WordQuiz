import Game from "./Game";
import Home from "./Home";
import { Route, Routes } from 'react-router';

export default function App() {
  return (
    <Routes>
      <Route exact path="/"  element={<Home />} />
      <Route path="/Game"  element={<Game />} />
    </Routes>
  )
}