export const haveSameContent = (one, another) => { 
  if (one.length !== another.length) { return false }

  return one.every((item, index) => item === another[index])
}