export const convertToHtml = async (pandoc: any, content: string) => {
  const result = await pandoc.run({
    text: content,
    options: { from: 'markdown', to: 'html' },
  })

  const blob = new Blob([result], { type: 'text/html' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'output.html'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
