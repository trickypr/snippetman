<script lang="ts">
  import SidebarItem from './SidebarItem.svelte'
  import SidebarTitle from './SidebarTitle.svelte'

  import { languageFilter, snippets, tagFilters } from '~/store/appState'
  import { getTags } from '~/store/tags'
  import { languages, longLanguage } from '../editor/languages'
  import { initDevTools } from '~/utils/devtools'

  let tags = getTags()

  $: usedLanguages = languages.filter((lang) =>
    $snippets.some((snippet) => snippet.language == lang)
  )
</script>

<div
  class="bg-slate-800 p-2 w-48 h-full border-r border-r-slate-700"
  role="tree"
>
  <SidebarTitle title="Tag">
    {#await tags then tags}
      {#each tags as tag (tag.id)}
        <SidebarItem
          selected={$tagFilters.some((fTag) => fTag.id == tag.id)}
          on:command={() =>
            tagFilters.update((filters) => {
              if (filters.some((fTag) => fTag.id == tag.id))
                return filters.filter((fTag) => fTag.id != tag.id)

              return [...filters, tag]
            })}
        >
          {tag.name}
        </SidebarItem>
      {/each}
    {/await}
  </SidebarTitle>

  <SidebarTitle title="Language">
    <SidebarItem on:command={() => languageFilter.set(null)}>All</SidebarItem>

    {#each usedLanguages as language}
      <SidebarItem
        on:command={() => languageFilter.set(language)}
        selected={language == $languageFilter}
      >
        {longLanguage(language)}
      </SidebarItem>
    {/each}
  </SidebarTitle>

  <SidebarTitle title="Dev">
    <SidebarItem on:command={() => window.location.reload()}>
      Reload
    </SidebarItem>
    <SidebarItem on:command={() => initDevTools()}>Open Devtools</SidebarItem>
  </SidebarTitle>
</div>
