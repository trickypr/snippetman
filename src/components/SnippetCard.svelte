<script lang="ts">
  import { openSnippetId } from '~/store/appState'
  import type { TaggedSnippet } from '~/store/snippets'

  export let snippet: TaggedSnippet
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="group cursor-pointer select-none p-2 data-[selected=true]:bg-cyan-950 data-[selected=true]:hover:bg-cyan-900 data-[selected=true]:text-cyan-100 hover:bg-slate-700 m-2 rounded-lg"
  data-selected={$openSnippetId == snippet.id}
  on:click={() => openSnippetId.set(snippet.id)}
>
  <div class="flex justify-between items-start">
    <h3 class="text-lg font-bold -mb-1">{snippet.title}</h3>
    <!-- TODO: Use language icon here -->
    <div>{snippet.language}</div>
  </div>

  <span
    class="text-sm text-slate-400 group-data-[selected=true]:text-cyan-500 saturate-50"
  >
    {snippet.tags.length == 0
      ? 'No tags'
      : snippet.tags.map((tag) => tag.name).join(', ')}
  </span>
</div>
