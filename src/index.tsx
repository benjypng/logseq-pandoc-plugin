import '@logseq/libs'

import { TIMEOUT } from './constants'
import { menuItems } from './menu-items'
import { settings } from './settings'
import { getAllNestedContent } from './utils/get-all-nested-content'
import { pandocInit } from './utils/pandoc-init'

const main = async () => {
  console.log('logseq-pandoc-plugin loaded')
  await logseq.UI.showMsg('logseq-pandoc-plugin: Getting ready...', 'success', {
    key: 'introMsg',
    timeout: 9999,
  })

  const scriptEl = parent.document.createElement('script')
  scriptEl.src = `${logseq.baseInfo.lsr}pandoc/pandoc.js`
  scriptEl.type = 'module'
  parent.document.head.appendChild(scriptEl)

  setTimeout(async () => {
    const pandoc = await pandocInit()
    logseq.UI.closeMsg('introMsg')
    logseq.UI.showMsg('Able to start using Pandoc now', 'success')

    // Create page context menu items
    if (logseq.settings!.showPageMenu) {
      for (const item of menuItems) {
        logseq.App.registerPageMenuItem(item.label, async (e) => {
          // pbt includesChildren by default
          const pbt = await logseq.Editor.getPageBlocksTree(e.page)
          if (!pbt || pbt.length === 0) return

          const allContent = await getAllNestedContent(pbt)
          await item.action(pandoc, allContent)
        })
      }
    }

    // Create block context menu items
    if (logseq.settings!.showBlockMenu) {
      for (const item of menuItems) {
        logseq.Editor.registerBlockContextMenuItem(item.label, async (e) => {
          const blk = await logseq.Editor.getBlock(e.uuid, {
            includeChildren: true,
          })
          if (!blk) return

          const allContent = await getAllNestedContent([blk])
          await item.action(pandoc, allContent)
        })
      }
    }
  }, TIMEOUT)
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
