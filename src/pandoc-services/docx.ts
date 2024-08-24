import { base64ToArrayBuffer } from '../utils/base64-to-arraybuffer'

export const convertToDocx = async (pandoc: any, content: string) => {
  const result = await pandoc.run({
    text: content,
    options: { from: 'markdown', to: 'docx' },
  })

  const arrayBuffer = base64ToArrayBuffer(result)

  const a = document.createElement('a')
  a.href = URL.createObjectURL(
    new Blob([arrayBuffer], {
      type: 'mime',
    }),
  )
  a.download = 'output.docx'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
