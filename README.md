![Logseq Badge](https://img.shields.io/badge/logseq-%2385C8C8?style=for-the-badge&logo=logseq&logoColor=black)

# Overview 

Convert your Logseq pages and blocks to various formats using Pandoc, with support for citations and nice formatting.

![](/screenshots/demo.gif)

## Features

- Convert Logseq pages and blocks to multiple formats:
  - Microsoft Word (docx)
  - PowerPoint (pptx)
  - HTML
  - LaTeX
- Preserve formatting and structure from Logseq
- Handle citations seamlessly
- Easy-to-use interface within Logseq

## Installation

From the marketplace, or manually download the release to load as an unpacked plugin.

## Usage

1. Right-click the page-name or right-click the block you want to convert
2. Choose the Pandoc option of your choice.
6. Save the generated file to your desired location

### Using Filters

Filters are not supported by `pandoc-wasm`. Hence, the plugin offers an easy way to copy the required shell command to your clipboard, so that you can copy and paste into your shell. You will first need to specify the `pathToFilter` and `pathToOutput` in the plugin settings. Regardless, since the plugin simply copies the command to the clipboard, you can make changes before running it.

## Configuration

Not much configuration is needed. However, if you want to reduce the number of context menu items, you can disable either the block or page context menu items.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Credits

[pandoc-wasm](https://github.com/georgestagg/pandoc-wasm)
