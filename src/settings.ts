import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'showBlockMenu',
    type: 'boolean',
    title: 'Show Pandoc Options in Block Menu',
    description:
      'If indicated, Pandoc options will be available in the block context menu.',
    default: true,
  },
  {
    key: 'showPageMenu',
    type: 'boolean',
    title: 'Show Pandoc Options in Page Menu',
    description:
      'If indicated, Pandoc options will be available in the page context menu.',
    default: true,
  },
  {
    key: 'customShellCmdHeading',
    type: 'heading',
    title: 'Customise Pandoc Shell Command for Docx Conversion',
    description:
      'Pandoc WASM does not support filters. You can specify the necessary parameters and the shell command will be copied to your clipboard upon using.',
    default: '',
  },
  {
    key: 'pathToFilter',
    type: 'string',
    title: 'Path to Filter',
    description: 'Indicate path to the filter you want to use',
    default: '~/Desktop/zotero.lua',
  },
  {
    key: 'pathToOutput',
    type: 'string',
    title: 'Path to Output',
    description:
      'Indicate path to the file you want to output to. If this file exists, it will be OVERWRITTEN.',
    default: '~/Desktop/output.docx',
  },
]
