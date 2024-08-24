import { BlockEntity } from '@logseq/libs/dist/LSPlugin'

export const getAllNestedContent = async (
  blocks: BlockEntity[],
): Promise<string> => {
  let str = ''
  const getNestedContent = async (blocks: BlockEntity[]) => {
    for (const block of blocks) {
      if (block.content.length === 0) continue

      // Start handling brackets, block references, etc.
      let content = block.content.trim().replace('[[', '').replace(']]', '')
      const uuidRe =
        /\(\(\s*([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\s*\)\)/
      const matchBlock = uuidRe.exec(content)
      if (matchBlock && matchBlock[0] && matchBlock[1]) {
        const blkContent = (await logseq.Editor.getBlock(matchBlock[1]))
          ?.content
        if (!blkContent) continue
        content = content.replace(matchBlock[0], blkContent)
        content = content.substring(0, content.indexOf('id:: '))
        console.log(content)
      }

      str += content + '\n\n'
      if (block.children) {
        await getNestedContent(block.children as BlockEntity[])
      }
    }
  }
  await getNestedContent(blocks)
  return str
}
