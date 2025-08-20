import dayjs from "dayjs";
import Rand, { PRNG } from "rand-seed";

  const today = dayjs().year(2025).month(7).date(21)

let rand = new Rand(today, PRNG.mulberry32);
const result1 = rand.next()

rand = new Rand(today, PRNG.mulberry32);
const result2 = rand.next()

console.log("today:", today)
console.log('RESULT1:', result1);
console.log('RESULT2:', result2);
console.log(today.year(2025).month(7).date(21).format("YYYY-MM-DD") === today.format("YYYY-MM-DD") && !false);