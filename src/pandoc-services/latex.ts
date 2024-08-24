export const convertToLatex = async (pandoc: any, content: string) => {
  const result = await pandoc.run({
    text: content,
    options: { from: 'markdown', to: 'latex' },
  })

  const blob = new Blob([result], { type: 'text/latex' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'output.tex'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
