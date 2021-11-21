/* eslint-disable */
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

export function parseRichText(content: any, inlineStyles: any) {
  const contentState = content.blocks ? convertFromRaw(content) : content
  const options = {
    inlineStyles,
  }
  return stateToHTML(contentState, options)
}
