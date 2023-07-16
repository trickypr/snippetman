<script lang="ts">
  import SidebarItem from './SidebarItem.svelte'
  import SidebarTitle from './SidebarTitle.svelte'

  import { filter } from '~/store/appState'
  import { getTags } from '~/store/tags'
  import { languages, longLanguage } from './editor/languages'

  let lazy: any = {}
  ;(ChromeUtils as any).defineESModuleGetters(lazy, {
    BrowserToolboxLauncher:
      'resource://devtools/client/framework/browser-toolbox/Launcher.sys.mjs',
  })

  let tags = getTags()

  $: (async () => {
    console.log('tags', await tags)
  })()
</script>

<div
  class="bg-slate-800 p-2 w-48 h-full border-r border-r-slate-700"
  role="tree"
>
  <SidebarItem on:command={() => ($filter = { type: 'none' })}>All</SidebarItem>

  <SidebarTitle title="Tag">
    <SidebarItem>Gecko</SidebarItem>
    <SidebarItem>Tailwind</SidebarItem>
    <SidebarItem>Svelte</SidebarItem>
  </SidebarTitle>

  <SidebarTitle title="Language">
    {#each languages as value}
      <SidebarItem
        on:command={() => ($filter = { type: 'language', value })}
        selected={$filter.type == 'language' && $filter.value == value}
      >
        {longLanguage(value)}
      </SidebarItem>
    {/each}
  </SidebarTitle>

  <SidebarTitle title="Dev">
    <SidebarItem on:command={() => window.location.reload()}>
      Reload
    </SidebarItem>
    <SidebarItem on:command={() => lazy.BrowserToolboxLauncher.init()}>
      Open Devtools
    </SidebarItem>
  </SidebarTitle>
</div>
