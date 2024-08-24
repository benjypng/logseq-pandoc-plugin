import {
  convertToDocx,
  convertToHtml,
  convertToLatex,
  convertToPptx,
} from './pandoc-services'

interface MenuItem {
  label: string
  action: (pandoc: any, content: string) => Promise<void>
}

export const menuItems: MenuItem[] = [
  {
    label: 'Pandoc: Convert to docx',
    action: convertToDocx,
  },
  {
    label: 'Pandoc: Convert to pptx',
    action: convertToPptx,
  },
  {
    label: 'Pandoc: Convert to HTML',
    action: convertToHtml,
  },
  {
    label: 'Pandoc: Convert to Latex',
    action: convertToLatex,
  },
]
