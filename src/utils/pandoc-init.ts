export const pandocInit = async () => {
  // @ts-expect-error Access Pandoc on parent window
  const pandoc = new parent.Pandoc()
  await pandoc.init()
  return pandoc
}
