<script lang="ts">
  import Fuse from 'fuse.js'

  import Sidebar from './components/sidebar/Sidebar.svelte'
  import SnippetCard from './components/SnippetCard.svelte'
  import Snippet from './components/Snippet.svelte'

  import {
    languageFilter,
    openSnippetId,
    snippets,
    tagFilters,
  } from './store/appState'
  import { createSnippet, type TaggedSnippet } from './store/snippets'
  import Settings from './components/settings/Settings.svelte'

  let search = ''

  const fuseFilter = (snippets: TaggedSnippet[], search: string) =>
    search != ''
      ? new Fuse(snippets, {
          keys: ['title', 'language', 'tags.name', 'code'],
          includeScore: true,
          useExtendedSearch: true,
        })
          .search(search)
          .map((res) => ({ ...res, ...res.item }))
      : snippets

  $: filteredSnippets = fuseFilter(
    $snippets.filter(
      (snippet) =>
        ($languageFilter == null || snippet.language == $languageFilter) &&
        ($tagFilters.length == 0 ||
          $tagFilters.every((fTag) =>
            snippet.tags.some((tag) => tag.id == fTag.id)
          ))
    ),
    search
  )
</script>

<div class="flex h-screen bg-slate-800">
  <Sidebar />

  <div class="flex border-r border-r-slate-700 flex-col">
    <div class="p-2 flex gap-2 border-b border-b-slate-700">
      <input
        type="search"
        class="bg-slate-700 rounded px-2"
        bind:value={search}
      />
      <button class="bg-slate-700 rounded px-2" on:click={() => createSnippet()}
        >+</button
      >
    </div>

    <div class="grow">
      {#each filteredSnippets as snippet (snippet.id)}
        <SnippetCard {snippet} />
      {/each}
    </div>
  </div>

  <div class="grow p-4 flex flex-col">
    {#if $openSnippetId != null}
      <Snippet snippetId={$openSnippetId} />
    {/if}
  </div>
</div>

<Settings />
