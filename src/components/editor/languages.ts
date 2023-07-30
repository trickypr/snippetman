import type { LanguageSupport } from '@codemirror/language'

import cppIcon from 'material-icon-theme/icons/cpp.svg'
import htmlIcon from 'material-icon-theme/icons/html.svg'
import jsIcon from 'material-icon-theme/icons/javascript.svg'
import jsonIcon from 'material-icon-theme/icons/json.svg'
import mdIcon from 'material-icon-theme/icons/markdown.svg'
import tsIcon from 'material-icon-theme/icons/typescript.svg'

export const languages = ['json', 'js', 'ts', 'html', 'cpp', 'md'] as const
export type Language = (typeof languages)[number]

export function longLanguage(language: Language): string {
  switch (language) {
    case 'json':
      return 'JSON'
    case 'js':
      return 'JavaScript'
    case 'ts':
      return 'TypeScript'
    case 'html':
      return 'HTML'
    case 'cpp':
      return 'C++'
    case 'md':
      return 'Markdown'
  }
}

export async function getCodemirrorLanguage(
  language: Language,
): Promise<LanguageSupport> {
  switch (language) {
    case 'json':
      const { json } = await import('@codemirror/lang-json')
      return json()
    case 'js':
    case 'ts':
      const { javascript } = await import('@codemirror/lang-javascript')
      return javascript()
    case 'html':
      const { html } = await import('@codemirror/lang-html')
      return html()
    case 'cpp':
      const { cpp } = await import('@codemirror/lang-cpp')
      return cpp()
    case 'md':
      const { markdown } = await import('@codemirror/lang-markdown')
      return markdown()
  }
}

const languageIcons = Object.freeze({
  json: jsonIcon,
  js: jsIcon,
  ts: tsIcon,
  html: htmlIcon,
  cpp: cppIcon,
  md: mdIcon,
} as const)

export function getLanguageIcon(language: Language): string {
  return languageIcons[language]
}
