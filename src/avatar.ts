const hashInput = (username: string): number => {
  let sum = 0
  for (let index = 0; index < username.length; index++) {
    sum += username.charCodeAt(index)
  }

  return sum
}

const componentToHex = (c: number): string => {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

const avatarColor = (username: string): number => {
  return hashInput(username)
}

const createAvatar = (username: string): string => {
  const words = username.split('%20')
  let avatarName = ''
  for (const word of words) {
    if (word) avatarName += word[0]
  }

  const colorComponent = avatarColor(username)
  const color = rgbToHex(
    colorComponent % 256,
    (colorComponent + 100) % 256,
    (colorComponent + 200) % 256,
  )
  const letters = `<text font-family="Helvetica" font-size="14px" x="50%" y="50%" dy="0em" fill="#FFFFFF" alignment-baseline="central" text-anchor="middle">${avatarName}</text>`
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"',
    ` style="isolation:isolate" viewBox="0 0 32 32">`,
    `<path d="M0 0h32v32H0V0z" fill="${color}" />`,
    letters,
    '</svg>',
  ].join('')
}

export default createAvatar
