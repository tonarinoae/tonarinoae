export function getEpisodeName(video: {
  title: string
  tags?: { name: string }[]
}): string {
  if (video.tags?.[0] && video.title.startsWith(video.tags[0].name))
    return video.title
      .slice(video.tags[0].name.length)
      .replace(/the animation/i, "")
      .trim()

  const title = video.title.trim()

  const lastIndexSpace = title.lastIndexOf(" ") >>> 0

  return title.slice(lastIndexSpace + 1) || "Full"
}
