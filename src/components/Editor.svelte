<script>
  import CodeMirror from 'svelte-codemirror-editor'
  import { javascript } from '@codemirror/lang-javascript'
  import snippetmanDark from '~/themes/snippetmanDark'

  let value = ''
</script>

<CodeMirror
  bind:value
  lang={javascript()}
  theme={snippetmanDark}
  styles={{ '&': { height: '100%' } }}
  class="h-full border border-slate-700 rounded-lg overflow-clip"
/>
