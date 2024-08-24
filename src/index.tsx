import '@logseq/libs'

import { TIMEOUT } from './constants'
import {
  convertToDocx,
  convertToHtml,
  convertToLatex,
  convertToPptx,
} from './pandoc-services'
import { settings } from './settings'
import { pandocInit } from './utils/pandoc-init'

const main = async () => {
  console.log('logseq-pandoc-plugin loaded')

  const scriptEl = parent.document.createElement('script')
  scriptEl.src = `${logseq.baseInfo.lsr}pandoc/pandoc.js`
  scriptEl.type = 'module'
  parent.document.head.appendChild(scriptEl)

  setTimeout(async () => {
    const pandoc = await pandocInit()
    logseq.UI.showMsg('Able to start using Pandoc now')

    await logseq.Editor.registerBlockContextMenuItem(
      'Pandoc: Convert to docx',
      async (e) => {
        const blk = await logseq.Editor.getBlock(e.uuid)
        if (!blk) return
        await convertToDocx(pandoc, blk.content)
      },
    )

    await logseq.Editor.registerBlockContextMenuItem(
      'Pandoc: Convert to pptx',
      async (e) => {
        const blk = await logseq.Editor.getBlock(e.uuid)
        if (!blk) return
        await convertToPptx(pandoc, blk.content)
      },
    )

    await logseq.Editor.registerBlockContextMenuItem(
      'Pandoc: Convert to HTML',
      async (e) => {
        const blk = await logseq.Editor.getBlock(e.uuid)
        if (!blk) return
        await convertToHtml(pandoc, blk.content)
      },
    )

    await logseq.Editor.registerBlockContextMenuItem(
      'Pandoc: Convert to Latex',
      async (e) => {
        const blk = await logseq.Editor.getBlock(e.uuid)
        if (!blk) return
        await convertToLatex(pandoc, blk.content)
      },
    )
  }, TIMEOUT)
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
