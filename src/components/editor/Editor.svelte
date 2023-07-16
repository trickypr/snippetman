<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor'
  import snippetmanDark from '~/themes/snippetmanDark'
  import { getCodemirrorLanguage, type Language } from './languages'

  export let code: string
  export let language: Language

  $: langServer = getCodemirrorLanguage(language)
</script>

{#await langServer then lang}
  <CodeMirror
    bind:value={code}
    on:change
    {lang}
    theme={snippetmanDark}
    styles={{ '&': { height: '100%' } }}
    class="h-full border border-slate-700 rounded-lg overflow-clip"
  />
{/await}
