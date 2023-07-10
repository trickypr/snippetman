<script lang="ts">
  import { languages } from '../store/snippets'
  import SidebarItem from './SidebarItem.svelte'
  import SidebarTitle from './SidebarTitle.svelte'

  let lazy: any = {}
  ;(ChromeUtils as any).defineESModuleGetters(lazy, {
    BrowserToolboxLauncher:
      'resource://devtools/client/framework/browser-toolbox/Launcher.sys.mjs',
  })

  function handleReloadClick(event: MouseEvent) {
    window.location.reload()
  }

  function handleOpenDevtoolsClick(event: MouseEvent) {
    lazy.BrowserToolboxLauncher.init()
  }
</script>

<div
  class="bg-slate-800 p-2 w-48 h-full border-r border-r-slate-700"
  role="tree"
>
  <SidebarItem>All</SidebarItem>

  <SidebarTitle title="Tag">
    <SidebarItem>Gecko</SidebarItem>
    <SidebarItem>Tailwind</SidebarItem>
    <SidebarItem>Svelte</SidebarItem>
  </SidebarTitle>

  <SidebarTitle title="Language">
    {#each languages as language}
      <SidebarItem>{language}</SidebarItem>
    {/each}
  </SidebarTitle>

  <SidebarTitle title="Dev">
    <SidebarItem on:click={handleReloadClick}>Reload</SidebarItem>
    <SidebarItem on:click={handleOpenDevtoolsClick}>Open Devtools</SidebarItem>
  </SidebarTitle>
</div>
