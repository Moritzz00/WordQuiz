import Game from "./Game";
import Home from "./Home";
import { WORDLIST } from './Constants'
import useGetData from './useGetData';
import { Route, Routes } from 'react-router';

export default function App() {
  const data = useGetData(WORDLIST)

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Game" element={<Game data={data} />} />
    </Routes>
  )
}