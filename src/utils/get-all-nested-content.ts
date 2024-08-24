import { BlockEntity } from '@logseq/libs/dist/LSPlugin'

export const getAllNestedContent = (blocks: BlockEntity[]): string => {
  let str = ''
  const getAllNestedContent = (blocks: BlockEntity[]) => {
    for (const block of blocks) {
      if (block.content.length === 0) continue
      str += block.content.trim() + '\n\n'

      if (block.children) {
        getAllNestedContent(block.children as BlockEntity[])
      }
    }
  }
  getAllNestedContent(blocks)
  return str
}
