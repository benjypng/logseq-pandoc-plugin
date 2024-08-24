import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'showBlockMenu',
    type: 'boolean',
    default: true,
    title: 'Show Pandoc Options in Block Menu',
    description:
      'If indicated, Pandoc options will be available in the block context menu.',
  },
  {
    key: 'showPageMenu',
    type: 'boolean',
    default: true,
    title: 'Show Pandoc Options in Page Menu',
    description:
      'If indicated, Pandoc options will be available in the page context menu.',
  },
]
