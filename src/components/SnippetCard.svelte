<script lang="ts">
  import { openSnippetId } from '~/store/appState'
  import { type Snippet } from '~/store/snippets'
  import { getSnippetTags, type Tag } from '~/store/tags'

  export let snippet: Snippet
  export let tags: Tag[] = []

  $: (async () => (tags = await getSnippetTags(snippet.id)))()
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
    >{tags.length == 0
      ? 'No tags'
      : tags.map((tag) => tag.name).join(', ')}</span
  >
</div>
