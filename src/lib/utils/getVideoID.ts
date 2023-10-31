export const ID_LENGTH = 11

export const getVideoID = (url: string) => {
  const pattern = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&"'>]+)/
  const match = url.match(pattern)

  return match && match[5].length === ID_LENGTH ? match[5] : url
}
