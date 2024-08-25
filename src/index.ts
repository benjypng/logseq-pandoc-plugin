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

  // Check if loaded already first
  const scriptSrc = `${logseq.baseInfo.lsr}pandoc/pandoc.js`
  if (!parent.document.querySelector(`script[src="${scriptSrc}"]`)) {
    const scriptEl = parent.document.createElement('script')
    scriptEl.src = scriptSrc
    scriptEl.type = 'module'
    parent.document.head.appendChild(scriptEl)
  }

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

    // Create page context menu for shell command creation
    logseq.App.registerPageMenuItem(
      'Pandoc: Copy shell cmd for docx with filter',
      async (e) => {
        // const convertDateToFilename = (date: number) => {
        //   const dateString = date.toString()
        //   const year = dateString.slice(0, 4)
        //   const month = dateString.slice(4, 6)
        //   const day = dateString.slice(6, 8)
        //   return `${year}_${month}_${day}`
        // }
        // OPTION 1: Just pass the markdown file for pandoc to convert. However, there is the trade-off for the bullet marks.
        // const page = await logseq.Editor.getPage(e.page)
        // if (!page) return
        // const graphInfo = await logseq.App.getCurrentGraph()
        // if (!graphInfo) return
        // const path = page['journal?']
        //   ? `${graphInfo.path}/journals/`
        //   : `${graphInfo.path}/pages/`
        // const pageName = page['journal?']
        //   ? convertDateToFilename(page.journalDay!)
        //   : encodeURIComponent(page.originalName)
        // const pathWithPageName = `${path}${pageName}.md`
        // const pandocShellCmd = `pandoc --lua-filter=zotero.lua --from=markdown --to=docx --output=output.docx ${pathWithPageName}`

        // OPTION 2: Cat the actual markdown STRING to pandoc.
        const pbt = await logseq.Editor.getPageBlocksTree(e.page)
        if (!pbt || pbt.length === 0) return
        const mdString = await getAllNestedContent(pbt)
        const pandocShellCmd = `cat << EOF | pandoc --lua-filter=${logseq.settings!.pathToFilter} --from=markdown --to=docx --output=${logseq.settings!.pathToOutput}
${mdString}
EOF`
        await parent.navigator.clipboard.writeText(pandocShellCmd)
      },
    )
  }, TIMEOUT)
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
