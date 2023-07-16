<script lang="ts">
  import Sidebar from './components/Sidebar.svelte'
  import SnippetCard from './components/SnippetCard.svelte'
  import Snippet from './components/Snippet.svelte'

  import { snippets } from './store/appState'
  import { createSnippet } from './store/snippets'
</script>

<div class="flex h-screen bg-slate-800">
  <Sidebar />

  <div class="flex border-r border-r-slate-700 flex-col">
    <div class="p-2 flex gap-2 border-b border-b-slate-700">
      <input type="search" class="bg-slate-700 rounded px-2" />
      <button class="bg-slate-700 rounded px-2" on:click={() => createSnippet()}
        >+</button
      >
    </div>

    <div class="grow">
      {#each $snippets as snippet (snippet.id)}
        <SnippetCard {snippet} />
      {/each}
    </div>
  </div>

  <div class="grow p-4 flex flex-col">
    <Snippet />
  </div>
</div>
