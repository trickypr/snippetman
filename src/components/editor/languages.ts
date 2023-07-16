import type { LanguageSupport } from '@codemirror/language'

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
  language: Language
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
