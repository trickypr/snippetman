<script lang="ts">
  import Sidebar from './components/Sidebar.svelte'
  import Select from './components/Select.svelte'
  import { languages } from './store/snippets'
  import SnippetCard from './components/SnippetCard.svelte'

  const tags = ['Tailwind', 'Svelte']

  class Test {}
</script>

<div class="flex h-screen bg-slate-800">
  <Sidebar />

  <div class="flex border-r border-r-slate-700 flex-col">
    <div class="p-2 flex gap-2 border-b border-b-slate-700">
      <input type="search" class="bg-slate-700 rounded px-2" />
      <button class="bg-slate-700 rounded px-2">+</button>
    </div>

    <div class="grow">
      <SnippetCard
        name="Custom Select"
        tags={['Tailwind', 'Svelte']}
        lang={'ts'}
        selected
      />
      <SnippetCard
        name="Custom Select"
        tags={['Tailwind', 'Svelte']}
        lang={'ts'}
      />
    </div>
  </div>

  <div class="grow p-4 flex flex-col">
    <h2 class="text-2xl font-bold">Custom Select</h2>

    <div>
      <Select
        value={'html'}
        options={languages.map((lang) => ({ value: lang, label: lang }))}
      />

      <span class="border-l border-l-slate-700 h-4 mx-1" />

      {#each tags as tag}
        <span
          class="ml-1 px-1.5 bg-slate-700 text-slate-50 rounded-full inline-block"
        >
          {tag}
        </span>
      {/each}

      <span
        class="cursor-pointer hover:bg-slate-700 rounded-full px-1.5 select-none"
        >+</span
      >
    </div>

    <div class="grow mt-4">
      {#await import('./components/Editor.svelte') then Editor}
        <Editor.default />
      {/await}
    </div>
  </div>
</div>
